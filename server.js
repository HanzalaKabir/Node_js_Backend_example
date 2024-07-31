const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

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
const port = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
});
