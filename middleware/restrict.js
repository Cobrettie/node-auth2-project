const jwt = require("jsonwebtoken")
require("dotenv").config(); // for reading JWT_SECRET from .env file

const secret = 'secret'

function restrict() {
  return async (req, res, next) => {
    console.log(req.cookies)
    const authError = {
      message: "Invalid credentials"
    }

    try {
      const token = req.cookies.token
      if (!token) {
        return res.status(401).json(authError)
      }

      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError)
        }

        next()
      })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = restrict