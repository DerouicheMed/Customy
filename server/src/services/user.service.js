const User = require('../models/user');
const mongoose = require('mongoose');

class UserService {
}
 

UserService.prototype.getAll = (req,res) => {
    User.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserService.prototype.getById = (req,res) => {
    let id = req.params.id;
    User.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserService.prototype.add = (req,res) => {
    let obj = req.body;
    console.log(obj);
    let model = new User(obj);
    model._id=mongoose.Types.ObjectId();
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserService.prototype.update = (req,res) => {
    let id = req.body._id;
    User.findOneAndUpdate(id,req.body,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserService.prototype.delete = (req,res) => {
    let id = req.body._id;
    User.findOneAndDelete(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}



module.exports = UserService;