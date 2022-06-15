const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride =require('method-override')
const routes = require('./routes') // 引用路由器
require('./config/mongoose')
const PORT = process.env.PORT || 3000
const app = express()
const session = require('express-session')
const usePassport = require('./config/passport')

app.engine('hbs', exphbs({ defaultLayout : 'main' , extname: '.hbs' }))
app.set('view engine' , 'hbs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(routes)       // 將 request 導入路由器
app.use(session({
    secret:'ThisIsMySecret',
    resave:false,
    saveUninitialized:true
}))
usePassport(app)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})