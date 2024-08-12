const Order = require("../models/order.model")
const Product = require("../models/product.model")


async function orderProductPriceVerification(products, total){
    try {
        let totalOrder = 0;
        
        for(let prod of products){
            totalOrder += prod.price * prod.quantity;
            const product = await Product.findById(prod.product);

            if(!product || product.price !== prod.price){
                throw new Error(`El producto con id ${prod.product} no existe o el precio no coincide`);
            }   
        }

        if(totalOrder !== total){
            throw new Error(`El total no es correcto`);
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error al verificar precios del producto");
    }
}

async function postOrder (req,res){
    try{

        if(req.user._id !== req.body.user){
            return res.status(400)({
                ok: false,
                message: "No se puede crear una orden para otro usuario"
            })
        }

        await orderProductPriceVerification(req.body.products, req.body.total)

        const order = new Order(req.body);



        const newOrder = await order.save()

        res.status(201).send({
            ok: true,
            message:"Orden creada correctamente",
            order: newOrder
        })

    }catch (error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al crear producto"
        })
    }
}

async function getOrders(req, res){
    try{
        const id = req.params.id;

        let filter
        if(req.user.role === "ADMIN_ROLE"){
            filter = id ? {user:id} : {}
        } else {
            filter = { user: req.user._id}
        }


        const orders = await Order.find(filter)
                                        .populate("user", "fullname email")
                                        .populate("products.product")

        console.log(orders)


        return res.status(200).send({
            ok: true,
            message:"Ordenes obtenidas correctamente",
            orders
        })
    }
    catch(error){
    console.log(error)
    return res.status(500).send({
        ok: false,
        message: "Error al obtener ordenes"
    })
}
}


module.exports = {
    postOrder,
    getOrders
}