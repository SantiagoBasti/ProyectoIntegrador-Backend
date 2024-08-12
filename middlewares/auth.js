const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

function jwtVerify(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({
            ok: false,
            message: "El token es requerido"
        });
    }

    jwt.verify(token, SECRET, (error, payload) => {
        if (error) {
            return res.status(401).send({
                ok: false,
                message: "Token vencido o inválido"
            });
        }

        req.user = payload;
        next();
    });
}

module.exports = jwtVerify;
