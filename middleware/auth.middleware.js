const jwt = require('jsonwebtoken')
const config = require('config')

//this method checks requests to the server
module.exports = (req, res, next) => {//next - to continue the request
    if(req.method === 'OPTIONS'){//it just checks access to the server, so its not necessary to handle anything
        return next()
    }

    try {
        //get jwt token
        const token = req.headers.authorization.split(' ')[1]
        
        if(!token){
            return res.status(401).json({ message: 'No authorization' })
        }

        //decode jwt token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: 'No authorization' })
    }
}