const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRouter = require("./users/users-router.js")

// const restrict = require("./middleware/restrict.js")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use(usersRouter)
server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})


// server.get('/', (req, res) => {
//   res.status(201).json({
//     message: "server running my friend"
//   })
// })

server.listen(port, () => {
  console.log(`Server running at localhost ${port}`)
})