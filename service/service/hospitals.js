const { sequelize } = require('../db')
const util = require('../utils')
/**
 * 拆分types字段
 * 
 * @param {Array} arrTypes 需要模糊查询的类型
 * @param {Array} arrSearchs 需要查询的字符串
 * @returns {string} 
 */
const splitType = function (arrTypes,arrSearchs){
	let len = arrTypes.length;
	let str = ''
	for(let i =0;i<len;i++){
		if(i+1 >=len){
			//无后续字段时
			str += ' ' + arrTypes[i] + ' LIKE ' + '\'%'+ arrSearchs[i] +'%\'' 
		}else{
			//有后续字段
			str += ' ' + arrTypes[i] + ' LIKE ' + '\'%'+ arrSearchs[i] +'%\' AND ' 
		}
	}
	return str
}

const splitSearchAttr = function(searchAttr){
	let str = '';
	let len = searchAttr.length;
	for(let i =0;i<len;i++){
		if(i+1 >=len){
			//无后续字段时
			str += searchAttr[i]
		}else{
			//有后续字段
			str += searchAttr[i] + ','
		}
	}
	return str
}
const splitSelect = function (searchAttr,tableName){

}
const fuzzySearch = function(id, types, searchStrs){
    let searchSql = ''
	let idStr = ''
	//拼接types,searchStrs
	let splitStrs = splitType(types, searchStrs)
	if (util.isNull(id)) {
		searchSql = `SELECT id,account,backstageurl,name,password,type,url 
		FROM subHospitals WHERE ${splitStrs}`
	} else {
		idStr = `AND pid = ${id}`
		searchSql = `SELECT id,account,backstageurl,name,password,type,url 
		FROM subHospitals WHERE ${splitStrs} ${idStr} `
    }
    return searchSql
}

module.exports = {
    fuzzySearch
}