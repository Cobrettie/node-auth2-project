const db = require("../database/dbConfig.js")

function getUsers() {
  return db("users").select("id", "username", "department")
}

module.exports = {
  getUsers
}