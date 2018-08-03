const fs = require('fs-extra')
const router = require('koa-router')()

const registerRouter = (path,method,func) => {
	switch (method){
		case 'get' :
		router.get(path,func)
		break
		case 'post' :
		router.post(path,func)
		break
		case 'put' :
		router.put(path,func)
		break
		case 'del':
		router.del(path,func)
	}
}
//添加controller下的路由
const addController = (router,dir) => {
	let controllerPath = `${__dirname}\\${dir}`
	//controller下的所有js文件
	let files = fs.readdirSync(controllerPath)
	files.forEach(file => {
		console.log(`init controller : ${file}`)
		//获取controller下的mapping
		let mapping = require(`${controllerPath}\\${file}`)
		mapping.forEach(map => registerRouter(map.path,map.method,map.func))
	})
}

module.exports = function(dir = 'controller'){
	addController(router,dir)
	return router.routes()
}