const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/test";


// use await to make sure that the model doesn't get called before connection is established
const connection = async () => {
  await mongoose.connect(mongoURI, () =>
    console.log("connected to mongodb successfully")
  );
};

module.exports = connection;
