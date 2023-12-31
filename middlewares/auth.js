const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../controller/auth');
const pool = require('../db/config');

const login = (req, res, next) =>{
    const { email, password } = req.body;
    if(!email){
        return res.status(400).send({error:'email not valid'})
    }
    if(!password){
        return res.status(400).send({error:'password not valid'})
    }
    next()
}

const signup = async ( req, res, next ) =>{
    const { email, password, role } = req.body;
    const user = await db.User.findOne({ where: {email} });
    if(user){
        return res.status(400).send({error:'User already exists!'})
    }

    if(!email){
        return res.status(400).send({error:'email not valid'})
    }
    if(!password){
        return res.status(400).send({error:'password not valid'})
    }
    next()
}

const isAuth = async (req, res, next) =>{
    try{
        const t = req.headers.authorization;
        const token = t.split(" ").length>1?t.split(" ")[1]:t.split(" ")[0];
        const {id, email} = verifyToken(token);
        const user = await pool.query(`select * from users where id = $1`, [id]);
        if(user){
            next()
        }
    }
    catch(e){
        return res.status(400).send({error:'Unauthorized'})
    }
}
const isAdmin = async (req, res, next) =>{
    try{
        const t = req.headers.authorization;
        const token = t.split(" ").length>1?t.split(" ")[1]:t.split(" ")[0];
        const {id, email, role} = verifyToken(token);
        if(role === 'ADMIN'){
            next();
        }
        else{
            return res.status(400).send({error:'Unauthorized'})
        }
        next();
    }
    catch(e){
        return res.status(400).send({error:'Unauthorized'})
    }
}
const isHome = async (req, res, next) =>{
    try{
        const t = req.headers.authorization;
        const token = t.split(" ").length>1?t.split(" ")[1]:t.split(" ")[0];
        const {id, email, role} = verifyToken(token);
        
        if(role === 'HOME'){
            next();
        }
        else{
            return res.status(400).send({error:'Unauthorized'})
        }
    }
    catch(e){
        return res.status(400).send({error:'Unauthorized'})
    }
}

module.exports = { login, signup, isAuth, isHome, isAdmin }