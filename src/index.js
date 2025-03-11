const express = require('express');
const app = express();
const cors = require('cors');
const { PORT, SERVER_ADDRESS, NODE_ENV } = require("./constants/const");
const apiRouter = require("./routes/api");
const {mongodb, closeMongo} = require('./config/database')

// Enable CORS for all origins
app.use(cors());

app.use("/api", apiRouter);
app.use('/',(req,res) => {
  <h1>Hey this is wallet management system</h1>
})

const connectMongo = async () => {
  try {
    await mongodb()
    console.log("Database connected");
    if(NODE_ENV !== 'test'){
      app.listen(PORT,() => {
        console.log(`Server started at http://${SERVER_ADDRESS}:${PORT}`);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

connectMongo();

module.exports = app
