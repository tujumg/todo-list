const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new',(req,res) => {
    return res.render('new')
})

router.post('/',(req,res) =>{
    const userId = req.user._id
    const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
    return Todo.create({ name,userId })     // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch(error => console.log(error))
})

router.get('/:id', (req,res)=>{
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findById(_id,userId)
        .lean()
        .then((todo)=>res.render('detail',{todo}))
        .catch(error =>console.log(error))
})

router.get('/:id/edit', (req,res)=>{
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findById({_id,userId})
        .lean()
        .then((todo)=>res.render('edit',{todo}))
        .catch(error =>console.log(error))
})

router.put('/:id',(req,res) =>{
    const userId = req.user._id
    const _id = req.params.id 
    const { name , isDone } = req.body      // 從 req.body 拿出表單裡的 name 資料
    console.log('req.body',req.body)
    return Todo.findById(_id,userId)     // 存入資料庫
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(()=> res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:id',(req,res) =>{
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findById(_id,userId)
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router