const fs = require('fs-extra')
const db = require('./db')

// 读取models下所有文件
let files = fs.readdirSync(`${__dirname}/models`)

let js_files = files.filter(file => file.endsWith('.js'))

module.exports = {}

for(let f of js_files) {
	console.log(`import model ${f}`)
	let name = f.substring(0, f.length - 3)
	module.exports[name] = require(`${__dirname}/models/${f}`)
}

module.exports.sync = (force) => {
	db.sync(force)
}