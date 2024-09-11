const express = require('express')
const { resisterUser, loginUser } = require('../controllers/userControllers')
const Resisterchecker = require('../middlewares/resisterValidate')
const userRoutes = express.Router()

userRoutes.post("/resister",Resisterchecker,resisterUser)
userRoutes.post("/login",loginUser)
module.exports = userRoutes