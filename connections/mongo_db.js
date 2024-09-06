const mongoose = require("mongoose");
const models = require("../Models/Schema");
const options = { useUnifiedTopology: true, useNewUrlParser: true };
const url = "mongodb://127.0.0.1:27017/IMS";
  
let array={}
const connectToMongoDB = async () => {
  try {
    for (let _models of models) {
      const _connection = await mongoose.createConnection(url, options);
      await _connection.on(
        "error",
        console.error.bind(
          console,
          `${_models.db} MongoDB Connection Error >> :`
        )
      );
      await _connection.once("open", function () {
        console.log(
          `client ${_models.db} MongoDB of ${_models.coll} Connection ok!`
        );5
      });
      let _identifierKey = `${_models.coll}`;
     
      array[_identifierKey] = _connection.model(_models.coll, _models.schema);
      // array.push(Model);
    }
  } catch (error) {
    console.log("Error occurred while connecting MongoDB ..", error);
  }
  return array;
};


module.exports = connectToMongoDB;
