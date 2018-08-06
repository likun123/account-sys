const {db} = require('../db')

module.exports = db.defineModel('hospitals',{
	name:db.STRING(50)
})