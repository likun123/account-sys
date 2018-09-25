const model = require('../model')
const { sequelize } = require('../db')
const Op = sequelize.Op;
const Menus = model.Menus

const getMenus = async (ctx, next) => {
    //获取菜单权限
    //权限等级 0 超级管理员 可查看全部 其他则只展示对应医院下菜单
    let id = ctx.params.id
    if(id=="0"){
        var topMenu = await getAllMenu(id);
    }else{
        var topMenu = await getOneHospitalMenus(id)
    }
    ctx.body = topMenu
	
}

/**
 * 获取对应权限等级下菜单
 * 判断权限  0 超级管理员 1 慈溪 2 绍兴 3 城东 4 上虞 5 宏恩
 * @param {int} id 权限等级
 */
async function getOneHospitalMenus(id){
    var dataLists = [];
    var num = 4 + parseInt(id);
    dataLists.push(await getSeconMenu(num));
    return dataLists
}
//获取所有顶级菜单
/**
 * 
 * @param {int} id 权限等级 0 超级管理员 其他为不同医院下管理员
 */
async function getAllMenu(id){
    var dataLists = [];
    const topMenuLength = 4;

    //获取医院列表菜单以及子菜单
    dataLists.push(await getSeconMenu(1))
    //获取服务器信息
    dataLists.push(await getSeconMenu(2))
    // 获取域名备案信息
    dataLists.push(await getSeconMenu(3))
    // 获取其他信息
    return dataLists
}
//获取二级菜单
async function getSeconMenu(id){
    //获取医院列表菜单以及子菜单
    var TopMenuData = await Menus.findAll({
        where:{
            id:id
        },
        attributes:['id','parentMenuId','name','icon','alias','value','type','childs']
    })
    TopMenuData = JSON.stringify(TopMenuData)
    TopMenuData = JSON.parse(TopMenuData)
    // 获取二级菜单
    var subMenuData = await Menus.findAll({
        where:{
            parentMenuId:id
        },
        attributes:['id','parentMenuId','name','icon','alias','value','type','childs']
    })

    // 拼装数据
    // 二级菜单拼装
    var secondpzsj = [];
    subMenuData = JSON.stringify(subMenuData)
    subMenuData = JSON.parse(subMenuData)
    
    for (let i = 0; i < subMenuData.length; i++) {
        secondpzsj.push({
            entity:subMenuData[i],
            childs:null
        })
    }
    
    return {
        entity:TopMenuData,
        childs:secondpzsj
    }
}

module.exports = [
	{
		path: '/getMenu/:id',
		method: 'get',
		func: getMenus
	}
]