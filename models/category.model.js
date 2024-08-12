const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String,
            required: true,
            unique: true,
            index: true, 
            trim: true,
            minlength: 2,
            maxlength: 80
    },
    viewVale: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    
    description: {
        type:String,
        maxlength: 20,
        minlength: 5
    },
})

module.exports = mongoose.model("Category", categorySchema)