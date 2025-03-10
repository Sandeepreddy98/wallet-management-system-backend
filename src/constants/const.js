require('dotenv').config()
console.log(process.env.MONGO_URI)
const MONGO_URI= process.env.MONGO_URI
const PORT=process.env.PORT
const SERVER_ADDRESS = process.env.SERVER_ADDRESS
const NODE_ENV = process.env.NODE_ENV

module.exports = {MONGO_URI,PORT,SERVER_ADDRESS,NODE_ENV}
