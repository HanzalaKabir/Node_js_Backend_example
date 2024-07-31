const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("../../model/tourModel");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE_LOCAL;
const connectDB = async () => {
  try {
    await mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then((con) => {
        console.log("DB connected");
      });
  } catch (err) {
    console.log(err);
  }
};
connectDB();

//Read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("All data deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}
if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
