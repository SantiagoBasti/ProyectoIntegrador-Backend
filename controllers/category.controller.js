const Category = require("../models/category.model")


async function getCategories(req, res){
    try{
        
        const categories = await Category.find()

        if(categories.length === 0 ){
            return res.status(404).send({
                ok: false,
                message: "No hay categorias registradas"
            })
        }

        res.status(200).send({
            ok: true,
            message: "Categorias obtenidas",
            categories
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudieron obtener categorias"
        })
    }
}

async function createCategories(req, res){
    try{
        const category = new Category(req.body);

        const newCategory = await category.save();

        res.status(202).send({
            ok: true,
            message: "Categoria creada correctamente",
            category: newCategory
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudieron crear categorias"
        })
    }
}


module.exports ={
    getCategories,
    createCategories
}