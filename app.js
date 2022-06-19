const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride =require('method-override')
require('./config/mongoose')
const session = require('express-session')
const flash = require('connect-flash')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const routes = require('./routes') // 引用路由器
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT 

app.engine('hbs', exphbs({ defaultLayout : 'main' , extname: '.hbs' }))
app.set('view engine' , 'hbs')
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
})
app.use(routes)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})