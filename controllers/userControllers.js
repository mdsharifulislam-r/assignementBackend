const userModel = require("../database/Models/UserModel")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const jwt = require('jsonwebtoken')
exports.resisterUser =async (req,res) =>{
    try {
        const {username,email,password} = req.body
        if(!username && !email && !password){
            return res.json({
                status:false,
                message:"Please fill all data"
            })
        }
        const user = await userModel.findOne({email:email})
        if(user){
            return res.json({
                status:false,
                message:"account already exist"
            })
        }
        const data = await userModel.create({username,email,password})
        if(!data){
            return res.json({
                status:false,
                message:"something went wrong"
            })
        }
        return res.json({
            status:true,
            message:"Account created successfully"
        })
    } catch (error) {
        return res.json({
            status:false,
            message:"Server Error!"
        })
    }
}

exports.loginUser = async (req,res) =>{
    try {
        const result = validationResult
        console.log(result);
        
        const {email,password}= req.body
        if(!email&& !password){
            return res.json({
                status:false,
                message:"invalid credintials"
            })
        }
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.json({
                status:false,
                message:"user not register yet"
            })
        }
        const match = await bcrypt.compare(password,user?.password)
        if(!match){
            return res.json({
                status:false,
                message:"Email or password not match"
            })
        }
        const token = jwt.sign({id:user?._id,email:email},process.env.JWT_SECRET,{
            expiresIn:"1d"
        })
        return res.json({
            status:true,
            message:"Login Successfully",
            token
        })
    } catch (error) {
        console.log(error);
        return res.statusCode(500).json({
            status:false,
            message:"server error!"
        })
        
    }
}