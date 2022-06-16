// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router() 
const home = require('./modules/home')  // 準備引入路由模組
const todos = require('./modules/todos')  // 引入 todos 模組程式碼
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos) // 加入驗證程序
router.use('/users',users)
router.use('/', authenticator, home) // 加入驗證程序


module.exports = router  // 匯出路由器