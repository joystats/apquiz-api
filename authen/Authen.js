const jwt = require('jsonwebtoken')

const Authen = (req, res, next)=>{
    
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, 'kline', function(err, decoded) {
            if(decoded!==undefined){
                req.data = decoded
                next()
            }else{
                res.json({
                    success: false,
                    message: 'Not allow'
                }).status(403)
            }
        });
    } else {
        res.json({
            success: false
        }).status(403)
    }
    
}

module.exports = Authen