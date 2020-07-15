const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")
const secrets = require("../config/secrets.js")
// require("dotenv").config(); // for reading JWT_SECRET from .env file

const secret = 'secret'


function logError(err) {
  console.log("You shall not pass", err)
}


// Get all users

router.get('/users', async (req, res) => {
  try {
    const allUsers = await Users.getUsers()
    res.status(201).json(allUsers)
  } catch (err) {
    logError(err)
  }
})


// Get users by department
// router.get('/users', restrict(), async (req, res) => {
//   try {
//     const { department } = req.body
//     const users = await Users.getUsersByDepartment(department)
//     res.status(201).json(users)
//   } catch(err) {
//     logError(err)
//   }
// })


router.post('/register', async (req, res) => {
  try {
    const { username, password, department } = req.body
    const user = await Users.findBy({ username }).first()

    if (user) {
      return res.status(409).json({
        message: "Username is already taken"
      })
    }

    const newUser = await Users.addUser({
      username,
      password: await bcrypt.hash(password, 14),
      department
    })

    const token = generateToken(newUser)

    res.status(201).json({
      newUser,
      token
    })

  } catch(err) {
    logError(err)
  }
})


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({username}).first()

    if (!user) {
      return res.status(401).json({
        message: "invalid credentials"
      })
    }


    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({
        message: "invalid credentials"
      })
    }


    const token = generateToken(user)

    res.cookie("token", token, { httpOnly: true})
    res.json({
      message: `Welcome ${user.username}`,
      token: token,
    })

  } catch(err) {
    logError(err)
  }
})

function generateToken(singleUser) {
  const payload = {
      subject: singleUser.id,
      username: singleUser.username
    }

  return jwt.sign(payload, secret)
}


module.exports = router