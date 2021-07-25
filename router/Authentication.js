const Router = require('express').Router()
const jwt = require('jsonwebtoken')
const sequelize = require('../config/db.js')

Router.post('/signin',(req, res)=>{
	const { user_name, password } = req.body

	sequelize.query(`SELECT user_id, name, project FROM tb_users WHERE user_name='${user_name}' AND password='${password}' `)
	.then(([[data]]) => {
		const { user_id, name, project } = data
		const token = jwt.sign({data: {user_id, name, project}}, 'kline', {expiresIn: 60*100});
		res.send({
			data: token
		}).status(200)
	}).catch((err)=>{
		res.json({
			success: false,
			message: err.original
		})
	});
})

Router.post('/verify',(req, res)=>{
	try {
		const header = req.headers['authorization'];

		if(typeof header !== 'undefined') {
			const bearer = header.split(' ');
			const token = bearer[1];
			jwt.verify(token, 'kline', function(err, decoded) {
				 res.send({data: decoded}).status(200)
			});
		} else {
			res.sendStatus(401)
		}
	} catch(err) {
		 res.sendStatus(403)
	}
})

module.exports = Router