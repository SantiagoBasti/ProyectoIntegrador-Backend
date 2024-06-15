const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {type:String, require: true, minlength: 3, maxlength: 50},

    email: {type:String, require: true, unique: true, minlength: 3, maxlength: 80, trim: true, lowercase:true, validate:{ validator: (value)=>{
        const regex = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(value)
    }
    }},

    password: {type:String, require: true, minlength: 5, maxlength: 80, trim: true,  },

    bornDate: {type:Date, require: true},

    location: {type:String},

    role: {type:String, default: "CLIENT_ROLE", enum:["ADMIN_ROLE","CLIENT_ROLE", "USER_ROLE"]}

})

module.exports = mongoose.model("user", userSchema)