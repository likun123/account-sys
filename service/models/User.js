const {db} = require('../db')

module.exports = db.defineModel('users',{
	name:db.STRING(50)
})