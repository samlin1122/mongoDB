# MongoDB 常用指令

###### tags: `mongoDB`

## 常用語法

### 新增
```javascript=
db.collection.insetOne(<data>,<options>)
db.collection.insetMany(<data>,<options>)
```
### 更新
```javascript=
db.collection.updateOne(<filter>,<update>,<options>)
db.collection.updateMany(<filter>,<update>,<options>)
db.collection.replaceOne(<filter>,<update>,<options>)
```
### 刪除
```javascript=
db.collection.deleteOne(<filter>,<options>)
db.collection.deleteMany(<filter>,<options>)
```
### 尋找
```javascript=
db.collection.findOne(<filter>,<options>)
db.collection.findMany(<filter>,<options>)
```

```javascript=!
## 一般搜尋 : db.collections.find()
- 尋找對應屬性：db.collections.find({屬性名稱:屬性值})
- 數值區間：db.collections.find({屬性名稱:{$lte:400}})
- 複合條件：db.collections.find({屬性名稱:{$lte:400},rating:{$gte:4.8}})
- 關鍵字搜尋：db.rooms.find({"name":/雙/})

## 常用語法
- project 保護欄位：db.rooms.find({"name":/雙/},{"_id":0})
- 搜尋陣列裡面的值：db.rooms.find({"payment":{$in:["信用卡"]}})
```
| Sign |  Features  |
| ---- | ---------- |
| $eq  | 等於        |
| $ne  | 不等於      |
| $gt  | 大於        |
| $lt  | 小於        |
| $gte | 大於等於    |
| $lte | 小於等於    |
| $in  | 存在某個值   |
| $nin | 不存在某個值 |