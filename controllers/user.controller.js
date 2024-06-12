const User = require("../models/user.modal");

function getUser(req, res) {
    res.send("GET User desde controlador");
}

async function postUser(req, res){

    try{
        if(req.user?.role !== "ADMIN_ROLE"){

            req.body.role = "CLIENT_ROLE"
        }

        const user = new User(req.body);

        const newUser = await user.save()

        res.status(201).send(newUser)

    } catch(error){
        res.status(500).send("Error al crear usuario")
        console.log(error)
    }
}

function deleteUser(req, res) {
    res.send("DELETE User desde controlador");
}

module.exports = {
    getUser,
    postUser,
    deleteUser
};
