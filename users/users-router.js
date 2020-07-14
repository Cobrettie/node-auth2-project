const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")
require("dotenv").config(); // for reading JWT_SECRET from .env file

function logError(err) {
  console.log("You shall not pass", err)
}


// Get all users

// router.get('/users', restrict(), async (req, res) => {
//   try {
//     const allUsers = await Users.getUsers()
//     res.status(401).json(allUsers)
//   } catch (err) {
//     logError(err)
//   }
// })


// Get users by department
router.get('/users', restrict(), async (req, res) => {
  try {
    const { department } = req.body
    const users = await Users.getUsersByDepartment(department)
    res.status(201).json(users)
  } catch(err) {
    logError(err)
  }
})


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
    res.status(201).json(newUser)

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

    const validPassword = await bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      return res.status(401).json({
        message: "invalid credentials"
      })
    }

    const tokenPayload = {
      userId: user.id,
      username: user.username,
      department: user.department
    }

    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))
    res.json({
      message: `Welcome ${user.username}`
    })


  } catch(err) {
    logError(err)
  }
})


module.exports = router