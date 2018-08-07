const { sequelize } = require('../db')
const model = require('../model')
const Hospitals = model.Hospitals
const SubHospitals = model.SubHospitals
const { codes, checkResponseCode } = require('../utils/codes')
const hospitalsService = require('../service/hospitals')


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
	const { id, types, searchStrs } = ctx.request.body;
	//获得模糊查询字符串
	let searchSql = hospitalsService.fuzzySearch(id,types,searchStrs);
	//返回数据
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
	{
		path: '/Hospitals',
		method: 'get',
		func: getHospitals
	},
	{
		path: '/SubHospitals',
		method: 'get',
		func: getSubHospitals
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