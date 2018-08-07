const model = require('../model')
const Services = model.Services

const getServices = async (ctx, next) => {
	//获取服务器列表
	ctx.body = await Services.findAll()
}


module.exports = [
	{
		path: '/services',
		method: 'get',
		func: getServices
	}
]