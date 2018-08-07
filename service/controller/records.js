const model = require('../model')
const Records = model.Records

const getRecords = async (ctx, next) => {
	//获取备案信息列表
	ctx.body = await Records.findAll()
}

module.exports = [
	{
		path: '/records',
		method: 'get',
		func: getRecords
	}
]