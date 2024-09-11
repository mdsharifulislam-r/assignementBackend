const { checkSchema } = require("express-validator");

const Resisterchecker = checkSchema({
    username:{
        notEmpty:true,

    },
    email:{
        isEmail:true,
        notEmpty:true
    },
    password:{
        notEmpty:true,
        
    }
})

module.exports = Resisterchecker