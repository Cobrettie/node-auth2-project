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



module.exports = router