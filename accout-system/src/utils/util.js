/**
 *给数组排序
 *
 * @param {Array} obj
 * @returns 添加排序的数据
 */
const orderNum = function(obj){
    if (typeof obj === "object"){
        //处理结果 添加编号
        obj.forEach((ele, index) => {
            ele.num = index + 1;
          });
        return obj
    }
}

const util={
    orderNum
}
export default util