const codes ={
    '0000':{
        code:'0000',
        msg:'ok!'
    },
    '1002':{
        code:'1002',
        msg:'系统繁忙！',
    },
    '1003':{
        code:'1003',
        msg:'暂无数据！',
    },
    '1005':{
        code:'1005',
        msg:'请先登录'
    },
    '1006':{
        code:'1006',
        msg:'账号或密码错误！'
    },
    '1007':{
        code:'1007',
        msg:'参数格式错误'
    },
    '1008':{
        code:'1008',
        msg:'查询失败'
    },
    '1009':{
        code:'1009',
        msg:'账号异常！'
    },
    '1010':{
        code:'1010',
        msg:'网络繁忙，请稍后重试！'
    },
    '1012':{
        code:'1012',
        msg:'数据未更新！'
    },
    '1013':{
        code:'1013',
        msg:'更新失败!'
    },
    '1022':{
        code:'1022',
        msg:'无可删除数据!'
    },
    '1023':{
        code:'1023',
        msg:'删除失败!'
    },
    '1033':{
        code:'1033',
        msg:'插入失败!'
    }
}

function checkResponseCode(res){
    if(res === '' || res === null || res === undefined){
        return getResponseCode(codes['1006'],res)
    }else{
        return getResponseCode(codes['0000'],res)
    }
}
function getResponseCode(obj,res){
    return {
        code:obj.code,
        msg:obj.msg,
        data:res
    }
}

module.exports = {
    codes,
    checkResponseCode
}