const db = require('../db')

module.exports = db.defineModel('services_info',{
	ip:db.INTEGER,
	env:db.STRING,
	account:db.STRING,
	password:db.STRING,
	port:db.INTEGER,
	sql_add:db.STRING,
	sql_pwd:db.STRING
})