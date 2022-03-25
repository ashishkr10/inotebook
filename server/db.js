const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://ashish_10:ashish10@mern.hpnml.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to mongoose successfully");
  });
};

module.exports = connectToMongo;
