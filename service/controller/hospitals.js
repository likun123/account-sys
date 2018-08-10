const { sequelize } = require('../db')
const model = require('../model')
const Hospitals = model.Hospitals
const SubHospitals = model.SubHospitals
const { codes, checkResponseCode } = require('../utils/codes')
const hospitalsService = require('../service/hospitals')
const util = require('../utils')

/*获取医院相关信息*/
const getHospitals = async (ctx, next) => {
	//获取医院列表
	ctx.body = await Hospitals.findAll()
}
const getSubHospitals = async (ctx, next) => {
	//获取对应id下所有子医院列表
	let id = ctx.params.id
	let countall = await SubHospitals.findAll({
		where:{
			pid:id
		}
	}).then(res => {
		return res.length
	});
	ctx.body = await SubHospitals.findAll({
		where: {
			pid: id
		}
	}).then(res => {
		return checkResponseCode(res,countall)
	});
}

const search = async (ctx, next) => {
	//模糊查询字符串
	const { id, types, searchStrs,pagenum } = ctx.request.body;
	console.log("pagenum:"+pagenum)
	//获得模糊查询字符串
	let {searchSql,searchWithPagenationSql} = hospitalsService.fuzzySearch(id,types,searchStrs,pagenum);
	let countall =  await sequelize.query(searchSql,{ type: sequelize.QueryTypes.SELECT }).then(res=>{return res.length});
	//返回数据
	ctx.body = await sequelize.query(searchWithPagenationSql, { type: sequelize.QueryTypes.SELECT })
		.then(searchs => {
			return checkResponseCode(searchs,countall)
		})
		.catch(res => {
			console.log(res)
		})
}
const getAllSubHospitals = async (ctx, next) => {
	//获取所有子医院列表
	let countall = await SubHospitals.findAll().then(res => {
		return res.length
	});
	ctx.body = await SubHospitals.findAll().then(res => {
		return checkResponseCode(res,countall)
	});
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
const addSubHospital = async (ctx , next) => {
	const hospital = Object.assign({}, ctx.request.body)
	ctx.body = await SubHospitals.create(hospital)
	.then(res=>{
		if(res){
			return codes['0000']
		}else{
			return codes['1033']
		}
	})
	.catch(res=>{
		return res
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
	},
	{
		path: '/addSubHospitals',
		method: 'post',
		func: addSubHospital
	}
]