const model = require('../model')
const Utils = require('../utils')
const {codes,checkResponseCode} = require('../utils/codes')
const User = model.User
const fetchList = async (ctx, next) => {
    // 获取所有用户
    ctx.body = await User.findAll()
}

const fetchById = async (ctx, next) => {
    // 获取指定ID用户
    let id= ctx.params.id
    ctx.body = await User.findById(id)
}

const addUser = async (ctx, next) => {
    // 新建一个用户
    const user = Object.assign({}, ctx.request.body)
    ctx.body = await User.create(user)
}

const updateUser = async (ctx, next) => {
    // 修改一个用户
    console.log(ctx.params)
    console.log(ctx.request.body)
}

const removeUser = async (ctx, next) => {
    // 删除一个用户
    console.log(ctx.params.id)
}

const login = async (ctx, next) => {
    // 登陆
    const {name, password} = ctx.request.body
    ctx.body = await User.findOne({
    	where:{
    		name:name,
    		password:password
    	}
    })
    .then(res =>{
        var result = checkResponseCode(res);
        if(result.code == "0000"){
            result.token = Utils.generateToken(res);
        }
        return result;
    })
}
//验证token 返回用户是否登录
const checkIsLogin = async (ctx, next) => {
    let token = ctx.params.token;
    let result = Utils.verifyToken(token)
    //返回data 不是空对象则是已登录
    ctx.body = await checkResponseCode(result)
}


module.exports = [
    {
        path: '/users',
        method: 'get',
        func: fetchList
    },
    {
        path: '/users/:id',
        method: 'get',
        func: fetchById
    },
    {
        path: '/users',
        method: 'post',
        func: addUser
    },
    {
        path: '/users/:id',
        method: 'put',
        func: updateUser
    },
    {
        path: '/find/:id',
        method: 'del',
        func: removeUser
    },
    {
        path: '/users/login',
        method: 'post',
        func: login
    },
    {
        path:'/users/isLogin/:token',
        method:'get',
        func:checkIsLogin
    }
]