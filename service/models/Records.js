const {db} = require('../db')

module.exports = db.defineModel('records',{
	aliyun_account:db.STRING,
	aliyun_password:db.STRING,
	aliyun_record_password:db.STRING,
	gongan_account:db.STRING,
	gongan_password:db.STRING,
	email_account:db.STRING,
	email_password:db.STRING,
	status:db.INTEGER
})