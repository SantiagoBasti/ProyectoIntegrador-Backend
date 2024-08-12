require("dotenv").config(); 

const mongoose = require("mongoose");

const app = require("./app");


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("conectado a la BD")

    app.listen(process.env.SERVER_PORT, () => {

        console.log("Servidor funcionando en puerto 3000")
    })
})
.catch(error => console.log(error))

