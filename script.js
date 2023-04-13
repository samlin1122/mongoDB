const server = require("./server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("資料庫連線成功");
  })
  .catch(console.error);

server.listen(process.env.PORT);