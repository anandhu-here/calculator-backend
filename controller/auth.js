const jwt = require('jsonwebtoken');
const bcpt = require('bcryptjs');

require('dotenv').config()

console.log(process.env.JWT_SECRET, "pp")
const createToken = ({ id, email }) =>{
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token 
}

const verifyToken = (token) =>{
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {expiresIn:'24h'});
    return decoded;
}

const hashPassword = (password) =>{
    const h = bcpt.hashSync(password, 10);
    return h;
}



const comparePassord = (password, hash) => bcpt.compareSync(password, hash);



module.exports = { createToken, verifyToken, hashPassword, comparePassord }
