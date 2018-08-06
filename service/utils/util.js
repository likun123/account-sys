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
			str += ' '+ arrTypes[i] + ' LIKE ' + '\'%'+ arrSearchs[i] +'%\'' 
		}else{
			//有后续字段
			str += ' '+ arrTypes[i] + ' LIKE ' + '\'%'+ arrSearchs[i] +'%\' AND ' 
		}
	}
	return str
}

/**
 *判断是否为空
 *
 * @param {String} val
 * @returns 
 */
const isNull = function(val){
    if(val == undefined || val == null || val == "" || val == '' || val == "undefined" || val == "null" || val == "NULL" || val != "0" || val != 0){
        return true
    }
    return false
}
const util ={
    splitType,
    isNull
}
module.exports = util