const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")
// require("dotenv").config(); // for reading JWT_SECRET from .env file

function logError(err) {
  console.log("Error: ", err)
}

router.get('/users', async (req, res) => {
  try {
    const allUsers = await Users.getUsers()
    res.status(401).json(allUsers)
  } catch (err) {
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
    res.status(401).json(newUser)

  } catch (err) {
    logError(err)
  }
})

router.post('/login', (req, res) => {
  
})



module.exports = router