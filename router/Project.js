const Router = require('express').Router()
const Authen = require('../authen/Authen')
const sequelize = require('../config/db')

Router.get('/',Authen, (req, res)=>{
    const { user_id, project } = req.data.data
    sql=`
    SELECT n.*,(
        select COUNT(read_id) FROM tb_read WHERE user_id='${user_id}' AND news_id=n.news_id
    ) as read_count
    FROM tb_news n
    WHERE n.project='ALL' OR n.project='${project}' 
    ORDER BY n.start_date DESC
    `
    sequelize.query(sql)
    .then(([data])=>{
        res.send({
			data: data
		}).status(200)
    })
    .catch((err)=>{
        res.json({
			success: false,
			message: err.original.sqlMessage
		})
    })
})

Router.get("/news/:news_id",Authen, (req, res)=>{
    const { user_id, project } = req.data.data
    const { news_id }  = req.params
    sql=`SELECT n.*,(
        select COUNT(read_id) FROM tb_read WHERE user_id='${user_id}' AND news_id=n.news_id
    ) as read_count
    FROM tb_news n
    WHERE n.news_id='${news_id}' AND (n.project='ALL' OR n.project='${project}') 
        ORDER BY n.start_date DESC`
    sequelize.query(sql)
    .then(([data])=>{
        return sequelize.query(`INSERT INTO tb_read (user_id, news_id) VALUES (${user_id},${news_id})`)
        .then(()=>{
            return data
        })
        .catch((err)=>{
            res.json({
                success: false,
                message: err.original
            })
        })
    }).then((data)=>{
        res.send({
            data: data
        }).status(200)
    })
    .catch((err)=>{
        res.json({
			success: false,
			message: err.original.sqlMessage
		})
    })
})

Router.get('/read/log/:user_id',(req, res)=>{
    const { user_id } = req.params
    sql=`SELECT news_id, created
    FROM tb_read
    WHERE user_id=${user_id}
    ORDER BY created DESC
    `
    sequelize.query(sql)
    .then(([data])=>{
        res.send({
			data: data
		}).status(200)
    })
    .catch((err)=>{
        res.json({
			success: false,
			message: err.original
		})
    })
})

module.exports = Router