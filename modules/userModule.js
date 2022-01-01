const User = require('../model/User');
const  bcrypt = require('bcrypt');
const Joi = require('joi');


///////////////////////////* Get All Users From DataBase *////////////////////////////

exports.getUser = async(req, res, next)=>{
    try{
      var response = await User.find();
      res.status(200).send(response);
    }catch(err){
      res.status(400).send(err);
  }
  };


  ///////////////////////////* Update User By Id *////////////////////////////

  exports.updateUser =async (req, res, next)=>{

    try{
      let password = '';
        if(req.body.password){
          const salt = await bcrypt.genSalt(10);
          password = bcrypt.hash(req.body.password, salt);
        }else{
          password = req.body.password
        }
      var response = await User.findByIdAndUpdate(req.params.userId,{
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        username:req.body.username,
        email:req.body.email,
        number:req.body.number,
        address:req.body.address,
        password:password,
        bio:req.body.bio
      },{new : true})
      res.status(200).send(response);
    }catch(err){
      res.status(400).send(err);
  }
  };


  ///////////////////////////* Delete User By Id *////////////////////////////

  exports.deleteUser =async (req, res, next) => {
    try{
      var response = await User.findByIdAndRemove(req.params.userId);
    res.status(200).send(response);
  }catch(err){
    res.status(400).send(err);
  }
  };

  
///////////////////////////* Save The Post *////////////////////////////

 exports.SavePost = async (req, res, next) => {
  try{
      let post = await User.findByIdAndUpdate(req.params.userId,{            
          $push:{saved: req.body.saved}
          },{new : true})
      res.status(200).send(post);
  }catch(error){
      res.status(400).send(error.message);
  }
}



///////////////////////////* Delete the Saved The Post *////////////////////////////

 exports.DeleteSavedPost = async (req, res, next) => {
  try{
      let post = await User.findByIdAndUpdate(req.params.userId,{            
          $pull:{saved: req.body.saved}
          },{new : true})
      res.status(200).send(post);
  }catch(error){
      res.status(400).send(error.message);
  }
}



  ///////////////////////////* Get User By Id  *////////////////////////////

  // exports.getUserById = async(req, res, next)=>{
  //   try{
  //     var response = await User.findOne({"username": req.params.username}).exec();
  //     res.status(200).send(response);
  //   }catch(err){
  //     res.status(400).send(err);
  // }
  // };