const db = require("../database/dbConfig.js")

function getUsers() {
  return db("users").select("id", "username", "department")
}

function addUser(user) {
  return db("users").insert(user)
}

function findBy(filter) {
  return db('users')
    .where(filter)
}

module.exports = {
  getUsers,
  addUser,
  findBy
}