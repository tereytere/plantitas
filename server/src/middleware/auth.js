const { verifyToken } = require('../utils/jwt');
const User = require('../api/models/user.model');

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ message: "No tienes autorización" })
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(407).json({ message: "No hay token" })
    }
    const tokenVerify = verifyToken(token);
    console.log(token)
    console.log(tokenVerify)
    if (!tokenVerify.id) {
        return res.status(404).json({ message: "No existe este ID" })
    }
    const logged = await User.findById(tokenVerify.id);
    req.dataUser = logged;
    next();
}

const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ message: "No tienes autorización" })
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(407).json({ message: "No hay token" })
    }
    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.status(404).json({ message: "No existe este ID" })
    }
    const logged = await User.findById(tokenVerify.id);
    if (logged.role !== "admin") {
        return res.status(401).json({ message: "No eres admin" })
    }
    req.dataUser = logged;
    next();
}

module.exports = { isAuth, isAdmin };