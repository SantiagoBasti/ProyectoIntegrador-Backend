function isAdmin(req,res,next){

    if(req.user?.role === "ADMIN_ROLE"){
        next();
    } else {
        return res.status(400).send({
            ok: false,
            message: "No se puede acceder a este metodo"
        })
    }
}

module.exports = isAdmin