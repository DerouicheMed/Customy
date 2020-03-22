const UserResponse = require('../models/user_response');
const Question = require('../models/question');
const mongoose = require('mongoose');

class UserResponseService {
}
 

UserResponseService.prototype.getAll = (req,res) => {
    UserResponse.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserResponseService.prototype.getById = (req,res) => {
    let id = req.params.id;
    UserResponse.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserResponseService.prototype.getByResponse = (req,res) => {
    let model = new Question(req.body);
    UserResponse.find({"response" : { "_id" : model._id}},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

UserResponseService.prototype.add = (req,res) => {
    let model = new UserResponse(req.body);
    model._id=mongoose.Types.ObjectId();
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

module.exports = UserResponseService;