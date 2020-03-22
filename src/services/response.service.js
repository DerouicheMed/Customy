const Response = require('../models/response');
const Question = require('../models/question');
const mongoose = require('mongoose');

class ResponseService {
}
 

ResponseService.prototype.getAll = (req,res) => {
    Response.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

ResponseService.prototype.getById = (req,res) => {
    let id = req.params.id;
    Response.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

ResponseService.prototype.getByQuestion = (req,res) => {
    let model = new Question(req.body);
    Response.find({"question" : { "_id" : model._id}},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

ResponseService.prototype.add = (req,res) => {
    let model = new Response(req.body);
    model._id=mongoose.Types.ObjectId();
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

ResponseService.prototype.update = (req,res) => {
    let id = req.body._id;
    Response.findOneAndUpdate(id,req.body,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

ResponseService.prototype.delete = (req,res) => {
    let id = req.body._id;
    Response.findOneAndDelete(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}



module.exports = ResponseService;