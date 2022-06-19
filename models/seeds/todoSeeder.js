const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const Todo = require('../todo') // 載入 todo model
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
    name:'root',
    password : '12345678' ,
    email:'root@example.com'
}
db.once('open', () => {
    bcrypt
        .genSalt()
        .then(salt => bcrypt.hash('password',salt))
        .then(hash => User.create({
            name : SEED_USER.name,
            email : SEED_USER.email,
            password : hash
        }))
        .then(user =>{
            const userId = user._id
            return Promise.all(Array.from({ length:10 },
                (value,i) => Todo.create({ name: `name-${i}`, userId })
            ))
        })
        .then(() => {
            console.log('done.')
            process.exit()
        })
})