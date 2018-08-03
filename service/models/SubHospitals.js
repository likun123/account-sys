const db = require('../db')

module.exports = db.defineModel('subHospitals',{
	name:db.STRING(50),
	backstageurl:db.STRING(50),
	url:db.STRING(50),
	account:db.STRING(20),
	password:db.STRING(20),
	type:db.INTEGER
})