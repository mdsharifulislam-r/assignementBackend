const { default: mongoose } = require("mongoose");
const bcrypt  = require("bcrypt")
const user_schema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
user_schema.pre("save",async function (){
    try {
        const user = this
        this.password = await bcrypt.hash(user?.password,10)
    } catch (error) {
        console.log(error);
        
    }
 
})

const userModel = mongoose.model("user",user_schema)


module.exports = userModel