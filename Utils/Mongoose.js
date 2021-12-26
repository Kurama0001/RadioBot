const mongoose = require("mongoose");
const { DBCONNECTION } = require("../Config/Config");

module.exports = {
  init: () => {
    const mongOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, 
      poolSize: 10,
      serverSelectionTimeoutMS: 50000,
      socketTimeoutMS: 45000, 
      family: 4 
    }

    mongoose.connect(DBCONNECTION, mongOptions);
    mongoose.Promise = global.Promise;
    mongoose.connection.on("connected", () => console.log(["MongoDB"], "📡 Connexion réussie")).catch(() => console.log(["MongoDB"], "🚀 Connexion interrompu"))
  }
}