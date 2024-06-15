const User = require('../models/user.modal');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken") 
const secret = process.env.SECRET

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
        const id = req.params.idUpdate

        if(req.user.role !== 'ADMIN_ROLE' && req.user._id !== id){
            return res.status(400).send({
                ok: false,
                message:"No puede editar este usuario"
            })
        }

        const newData = req.body;

        // TODO: Hashear password en el update
        if(req.body.password) {
            
        }

        // TODO: Resetear Role

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

async function login(req, res){
    try{
        // Obtener email y password que me envie el usuario en el body
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(400).send({
            ok: false,
            message:"Email y Password son requeridos"
        })
    }

    console.log(email, password)
    // Chequear si el usuario existe, de ser asi lo obtenerlo
    const user = await User.findOne({email: {$regex: email, $options: "i"} })

    console.log(user)
    // Si el usuario no existe debuelvo un 404
    if(!user){
        return res.status(404).send({
            ok:false,
            message:"Datos incorrectos"
        })
    }
    // Comparar el pasword con el que tengo guardado con el de la base de datos ( el password de la DB esta hasheado entonces usamos bcrypt para comparar)
    const match = await bcrypt.compare(password, user.password)

    // Si los datos no coinciden devolvemos error
    if(!match){
        return res.status(400).send({
            ok:false,
            message:"Datos incorrectos"
        })
    }

    user.password = undefined

    const token = jwt.sign(user.toJSON(), secret, {expiresIn: "2m" })

    // Generamos un toke de login

    // Si todo ok hacemos devolvemos una respuesta favorabl
    res.status(200).send({
        ok:true,
        message:"Login Correcto",
        user,
        token
    })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message:"Error al hacer login"
        })
    }
}




module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
    login
}