const Sequelize = require('sequelize')
const mysqlConf = require('./config/mysql')

const sequelize = new Sequelize(mysqlConf.database,mysqlConf.username,mysqlConf.password,{
	host:mysqlConf.host,
	port:mysqlConf.port,
	dialect:'mysql',
	pool:{
		max:5,
		min:0,
		idle:30000
	}
});

const defineModel = (name,attributes) => {
	let attrs = {}
	//遍历实体个性字段绑定
	for(let key in attributes){
		let value = attributes[key]
		if(typeof value === 'object' && value['type']){
			value.allowNull = value.allowNull || false
			attrs[key] = value
		}else{
			attrs[key] = {
				type:value,
				allowNull:false
			}
		}
	}
	//实体通用字段 
	attrs.id = {
		type:Sequelize.BIGINT,
		primaryKey:true,
		autoIncrement:true
	}
	return sequelize.define(name,attrs,{
		tableName: name,
		timestamps: false,
		underscored:true,
		hooks:{
			//钩子 每次编辑的时候会同时修改
			beforeValidate:function(obj){
				console.log(obj)
				let now = Date.now();
				console.log(now);
			}
		}
	})
}

let db = {
	defineModel : defineModel,
	sync:(force = false) => {
		sequelize.sync({force:force});
	}
}
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
for (let type of TYPES) {
    db[type] = Sequelize[type];
}
//测试是否连接成功
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/
module.exports = db