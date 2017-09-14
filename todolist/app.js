
import Vue from 'vue'
import AV from 'leancloud-storage'
import style from './style.css'

let APP_ID = 'bOVGbcb9kXOqatTjMdljoUSY-gzGzoHsz';
let APP_KEY = 'WIDiOtVcxeep47n5EuSVFC6a';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null
    },

    methods: {
        fetchTodos: function(){
            if(this.currentUser){
                let query = new AV.Query('AllTodos')
                query.find()
                    .then((todos) => {
                        let avAllTodos = todos[0]
                        let id = avAllTodos.id
                        this.todoList = JSON.parse(avAllTodos.attributes.content)
                        this.todoList.id = id
                    }, function(error){
                        console.log(error)
                    })
            }
        },
        updateTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
            avTodos.set('content', dataString)
            avTodos.save().then(() => {
                console.log('更新成功!')
            })
        },

        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            let AVTodos = AV.Object.extend('AllTodos')
            let avTodos = new AVTodos()
            let acl = new AV.ACL()
            acl.setReadAccess(AV.User.current(),true) //只有这个用户能读
            acl.setWriteAccess(AV.User.current(),true) //只有这个用户能写

            avTodos.set('content', dataString)
            avTodos.setACL(acl) //设置访问权限
            avTodos.save().then( (todo) => {
                this.todoList.id = todo.id
                console.log('保存成功!')
            },function(error){
                console.log('保存失败!')
            })
        },
        saveOrUpdateTodos: function(){
            if(this.todoList.id){
                this.updateTodos()
            }else{
                this.saveTodos()
            }
        },
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false
            })
            this.newTodo = ''
            this.saveOrUpdateTodos()
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
            this.saveOrUpdateTodos()
        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            },  (error) => {
                alert('注册失败!')
            })
        },
        login: function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
                this.fetchTodos()
            }, (error) => {
                alert('登录失败!')
            })
        },
        getCurrentUser: function(){
            let current = AV.User.current()
            if(current){
                let {id, createdAt, attributes: {username}} = current
                console.log({id, username, createdAt})
                return {id, username, createdAt}
            }else{
                return null
            }
        },
        logout: function(){
            AV.User.logOut()
            this.currentUser = null
            window.location.reload()
        },
    },
    created: function(){
        this.currentUser = this.getCurrentUser()
        this.fetchTodos()
    }
})

