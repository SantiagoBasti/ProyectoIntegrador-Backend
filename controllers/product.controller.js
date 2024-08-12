const Product = require("../models/product.model")


async function getProducts(req,res){
    try{
        
        const products = await Product.find()
                                            .populate("category","name")

        res.status(200).send({
            ok:true,
            message:"Productos obtenidos correctamente",
            products,
        })
    }

    catch (error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al obtener producto"
        })
    }
}

async function getProductsById(req,res){
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate("category", "name")

        if(!product) {
            return res.status(404).send({
                ok: false,
                message: "No se pudo encontrar el producto"
            })
        }

        res.status(200).send({
            ok: true,
            message: "producto encontrado",
            product
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "No se pudo obtener producto"
        })
    }
}

async function deleteProduct(req,res){
    try {    
        console.log(req.params)
        
        const id = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(id)

        

        console.log(deletedProduct)

        if(!deletedProduct) {
            return res.status(404).send({
                ok: false,
                message: "No se encontró el producto que deseaba borrar"
            })
        }

        console.log(deletedProduct)

        res.status(200).send({
            ok: true,
            message: "El producto fue borrado correctamente"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al borrar el producto"
        })
    }
}

async function postProduct(req,res){
    try{

        if (req.files && req.files.productImage) {
            req.body.productImage = req.files.productImage[0].filename;
        }
        const product = new Product(req.body);
        


        const newProduct = await product.save();

        res.status(201).send({
            ok: true,
            message:"Producto creado correctamente",
            product: newProduct
        })

    }
    catch (error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear producto"
        })
    }
}

async function updateProduct(req,res){
    try {

        console.log(req.params.id)

        const id = req.params.id
        const data = req.body;

        if (req.files && req.files.productImage) {
            data.productImage = req.files.productImage[0].filename;


        } else {
            delete data.productImage
        }



        data.updateAt = Date.now()
        
        const product = await Product.findByIdAndUpdate(id, data, { new: true })

        if(!product) {
            return res.status(404).send({
                ok: false,
                message: "No se encontró el Producto"
            })
        }

        res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo editar Producto"
        })
    }

}


module.exports = {
    getProducts,
    getProductsById,
    deleteProduct,
    postProduct,
    updateProduct,
}