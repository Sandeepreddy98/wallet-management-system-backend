const mongoose = require('mongoose');
const { MONGO_URI, NODE_ENV } = require('../constants/const');
let mongoServer;

const mongodb = async () => {
    try{
        if (NODE_ENV === "test") {
          console.log("Skipping database connection in test mode.");
        return; // Do nothing in test mode
          }else{
            await mongoose.connect(MONGO_URI);
          }
    }catch(err){
        throw new Error("Connecting to database failed! : ",err);
    }
}

const closeMongo = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  };

module.exports = {closeMongo,mongodb}