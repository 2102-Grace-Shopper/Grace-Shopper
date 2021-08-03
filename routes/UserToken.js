const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const createJWT = (username, password) => {
    const token = jwt.sign({username, password}, JWT_SECRET);

    return token;
};

const verifyJWT = (token) => {
    const decrypted = jwt.verify(token, JWT_SECRET);

    if (!decrypted) {
        return null;
    }

    return decrypted;
};


module.exports = {
   createJWT,
   verifyJWT
}