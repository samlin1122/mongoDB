const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: true,
    },
    rating: Number,
    createdAt: {
      type: Date,
      immutable: true, // 可否更改
      default: Date.now,
      select: false, // 不顯示在documents上
    },
  },
  {
    versionKey: false,
    // collection: "Room", // 自定義 collection 名稱
    // timestamps: true, // 自動新增 createdAt & updatedAt
  }
);

module.exports = mongoose.model("Room", roomSchema);
// collection 名稱規則
// 1. 開頭強制小寫
// 2. 強制加上 s
// eg: Room > rooms
