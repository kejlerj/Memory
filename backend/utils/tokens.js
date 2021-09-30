const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId) => {
    return jwt.sign(
        { iss: 'memory.jeremykejler.fr', sub: userId },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw 'Error: Token missing';
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send();
    }
};

// function removeToken()

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
