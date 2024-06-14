const User = require('../models/user.modal');
const bcrypt = require("bcrypt");
const saltRounds = 10; 

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select({ password: 0})

        if(!user) {
            return res.status(404).send({
                ok: false,
                message: "No se pudo encontrar el usuario"
            })
        }

        res.status(200).send({
            ok: true,
            message: "Usuario encontrado",
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "No se pudo obtener usuario"
        })
    }
}

async function getUsers(req, res) {

    try {
        
        const users = await User.find().select({ password: 0 });

        res.status(200).send({
            ok: true,
            message: "Usuarios obtenidos correctamente",
            users
        })

    } catch (error) {
        console.log(error)
        // Devolvemos una respuesta con codigo 500 Internal Error
        res.status(500).send({
            ok: false,
            message: "Error al obtener usuarios"
        })
    }

}

async function postUser(req, res) {

    try {
        // Si me mandan el dato role y el usuario no es admin, entonces se lo asigno como cliente
        if (req.user?.role !== "ADMIN_ROLE") {
            req.body.role = "CLIENT_ROLE";
        }

        // Encriptar la contraseña antes de guardarla en la base de datos
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

        const user = new User(req.body);

        const newUser = await user.save();
        // Borrar la propiedad password antes de responder a quien realizo la peticion con los datos del nuevo usuario
        newUser.password = undefined;

        res.status(201).send(newUser);

    } catch (error) {
        res.status(500).send("Error al crear el usuario")
        console.log(error)
    }

}

async function deleteUser(req, res) {

    try {
        
        console.log(req.params)
        // Obtenemos de los params name definidos en la ruta el id
        const id = req.params.id;

        const deletedUser = await User.findByIdAndDelete(id)

        console.log(deletedUser)

        if(!deletedUser) {
            return res.status(404).send({
                ok: false,
                message: "No se encontró el usuario que deseaba borrar"
            })
        }

        console.log(deletedUser)

        res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al borrar el usuario"
        })
    }

    
}

async function updateUser(req, res) {

    try {

        const newData = req.body;

        // TODO: Hashear password en el update
        if(req.body.password) {
            
        }

        // TODO: Resetear Role

        const id = req.params.idUpdate;

        console.log(id)

        const updUser = await User.findByIdAndUpdate(id, newData, { new: true })

        if(!updUser) {
            return res.status(404).send({
                ok: false,
                message: "No se encontró el usuario"
            })
        }

        res.status(200).send({
            ok: true,
            message: "Usuario actualizado correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo editar usuario"
        })
    }

}




module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserById
}