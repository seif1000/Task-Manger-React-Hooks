const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {jwtSecret} = require('../config/key');
const auth = async (req, res, next) => {
    try {
       // const token = req.header('Authorization').replace('Bearer ', '')
       const token =  req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        
        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
const ensureGuest = (req, res, next)=>{
       if(req.token){
        res.redirect('/tasks')
       }else{
           return next();
       }
       
}

module.exports = {
     auth,
     ensureGuest
}


