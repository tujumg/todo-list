const express = require('express')
// const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride =require('method-override')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout : 'main' , extname: '.hbs' }))
app.set('view engine' , 'hbs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(routes)       // 將 request 導入路由器

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})