const Koa = require('koa')
const router = require('koa-router')()
const bodyparse = require('koa-bodyparser')()
const cors = require('koa2-cors')
const Utils = require('./utils')
const codes = require('./utils/codes')
//controllers 路由控制器
const controllers = require('./controllers')
const app =new Koa()

app.use(cors())


app.use(bodyparse)
app.use(controllers())
app.use(async(ctx,next) => {
	let {url = ''} = ctx;
	if(url.indexOf('/login') == -1) {
		//不是登录界面需要校验登录状态
		let header = ctx.request.header;
		let {authorization} = header;
		if(authorization){
			await next();
		}else{
			return ctx.body = codes['1005']
		}
	}else{
		await next();
	}
})

app.listen(3000);