const mongoose = require("mongoose");

async function main() {

  await mongoose.connect("mongodb://localhost:27017/adotai");

  console.log("Conectou ao Mongoose!");

}

main().catch(err => {
  console.log(err);
});

module.exports = mongoose;