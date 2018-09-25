const {db} = require('../db')

module.exports = db.defineModel('menus',{
    id:db.INTEGER,
    parentMenuId:db.INTEGER,
    name:db.STRING(50),
    icon:db.STRING(50),
    type:db.STRING(50),
    alias:db.STRING(50),
    childs:db.STRING(50)
})