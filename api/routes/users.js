const express = require('express');
const Register = require('./models/User');
const Login =    require('./models/User')
const router =require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//update
// app.put('users/:id', async  (req, res) =>{
//   try{
//     const {id}=req.params;
//     const user = await User.findByIdAndUpdate(id, req.body)
//     if(!user){
//         return res.status(404).json({message: `cannot find user ${id}`})
//   }
//   res.status(200).json(user);
//   }
//   catch(error){
//     res.status(500).json({message: error.message});
//   }
     
// })



  
  module.exports = router;

  

