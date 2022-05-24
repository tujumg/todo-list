const db = require('../../config/mongoose')
const Todo = require('../todo') // 載入 todo model

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0 ; i < 10 ; i++){
        Todo.create({name:'name-'+ i})
    }
    console.log('done')
})