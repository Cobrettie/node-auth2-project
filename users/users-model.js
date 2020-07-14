const db = require("../database/dbConfig.js")

function getUsers() {
  return db("users").select("id", "username", "department")
}

function addUser(user) {
  return db("users").insert(user)
}

function findBy(filter) {
  return db("users")
    .where(filter)
}

function findById(id) {
  return db("users")
    .where({ id })
}

module.exports = {
  getUsers,
  addUser,
  findBy,
  findById
}