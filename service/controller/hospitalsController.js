const { sequelize } = require('../db')
const model = require('../model')
const Hospitals = model.Hospitals
const SubHospitals = model.SubHospitals
const Services = model.Services
const Records = model.Records
const { codes, checkResponseCode } = require('../utils/codes')
const util = require('../utils/util')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const index = async (ctx, next) => {
	ctx.body = `<h1>Index</h1>
		<form action="/hospitals" method="POST">
			<p>Name: <input name="name" value="koa" type="text" /> </p>
			<p>Password: <input name="password" type="password" /></p>
			<p><input type="submit" value="submit" /></p>
		</form>
	`;
}
/*获取医院相关信息*/
const getHospitals = async (ctx, next) => {
	//获取医院列表
	ctx.body = await Hospitals.findAll()
}
const getSubHospitals = async (ctx, next) => {
	//获取对应id下所有子医院列表
	let id = ctx.params.id
	ctx.body = await SubHospitals.findAll({
		where: {
			pid: id
		}
	});
}

const search = async (ctx, next) => {
	//模糊查询字符串
	const { id, types, searchStrs } = ctx.request.body.params;
	let searchSql = ''
	let idStr = ''
	//拼接types,searchStrs
	let splitStrs = util.splitType(types, searchStrs)
	if (util.isNull(id)) {
		idStr = `AND pid = ${id}`
		searchSql = `SELECT id,account,backstageurl,name,password,type,url 
		FROM subHospitals WHERE ${splitStrs} ${idStr} `
	} else {
		searchSql = `SELECT id,account,backstageurl,name,password,type,url 
		FROM subHospitals WHERE ${splitStrs}`
	}
	ctx.body = await sequelize.query(searchSql, { type: sequelize.QueryTypes.SELECT })
		.then(searchs => {
			return checkResponseCode(searchs)
		})
		.catch(res => {
			console.log(res)
		})
}
const getAllSubHospitals = async (ctx, next) => {
	//获取所有子医院列表
	ctx.body = await SubHospitals.findAll();
}
const getServices = async (ctx, next) => {
	//获取服务器列表
	ctx.body = await Services.findAll()
}
const getRecords = async (ctx, next) => {
	//获取备案信息列表
	ctx.body = await Records.findAll()
}

const updateSubHospital = async (ctx, next) => {
	// console.log(JSON.stringify(ctx.request))
	const { id, name, backstageurl, account, password, type } = ctx.request.body;
	ctx.body = await SubHospitals.update({
		name: name,
		backstageurl: backstageurl,
		account: account,
		password: password,
		type: type
	}, {
			where: {
				id: id
			}
		})
		.then(res => {
			if (res != 0) {
				return codes['0000']
			} else {
				return codes['1012']
			}
		})
		.catch(res => {
			return codes['1013']
		})
}

const delSubHospital = async (ctx, next) => {
	//通过参数获取id
	const id = ctx.params.id;
	ctx.body = await SubHospitals.destroy({
		where: {
			id: id
		}
	})
		.then(res => {
			if (res != 0) {
				return codes['0000']
			} else if (res == '' || res == null || res == undefined) {
				return codes['1022']
			}
		})
		.catch(res => {
			return codes['1023']
		})
}

module.exports = [
	/*{
		path: '/',
		method: 'get',
		func: index
	},*/
	{
		path: '/Hospitals',
		method: 'get',
		func: getHospitals
	},
	{
		path: '/SubHospitals/:id',
		method: 'get',
		func: getSubHospitals
	},
	{
		path: '/search',
		method: 'post',
		func: search
	},
	{
		path: '/services',
		method: 'get',
		func: getServices
	},
	{
		path: '/records',
		method: 'get',
		func: getRecords
	},
	{
		path: '/AllSubHospitals',
		method: 'get',
		func: getAllSubHospitals
	},
	{
		path: '/SubHospitals/:id',
		method: 'put',
		func: updateSubHospital
	},
	{
		path: '/SubHospitals/:id',
		method: 'del',
		func: delSubHospital
	}
]