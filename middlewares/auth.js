// Checkeamos si el usuario esta logeado, y para vamos a comprobar que tenga un token valido 
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

function jwtVerifly(req, res, next){

    const token = req.headers.authorization;

    // Checkeamos si nos enviaron un token, de no ser asi retornamos un 401
    if(!token){
        return res.status(401).send({
            ok: false,
            message:"El token es requerido"
        })
    }

    jwt.verify(token, SECRET, (error, payload) => {

        if(error){
            return res.status(401).send({
                ok: false,
                message:"Token vencido o invalido"
            })
        }
        console.log(payload)
        req.user = payload;

        next()

    })

}

module.exports = jwtVerifly;