const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',()=>{
    console.log('mongodb error!')
    console.log(process.env.MONGODB_URI) //確認是否成功輸入MONGODB_URI
})
db.once('open',()=>{
    console.log('mongodb connected!')
})
module.exports = db