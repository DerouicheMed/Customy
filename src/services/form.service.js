const Form = require('../models/form');
const Study = require('../models/study');
const mongoose = require('mongoose');

class FormService {
}
 

FormService.prototype.getAll = (req,res) => {
    Form.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

FormService.prototype.getById = (req,res) => {
    let id = req.params.id;
    Form.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

FormService.prototype.getByStudy = (req,res) => {
    let model = new Study(req.body);
    Form.find({"study" : { "_id" : model._id}},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

FormService.prototype.add = (req,res) => {
    let model = new Form(req.body);
    model._id=mongoose.Types.ObjectId();
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

FormService.prototype.update = (req,res) => {
    let id = req.body._id;
    Form.findOneAndUpdate(id,req.body,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

FormService.prototype.delete = (req,res) => {
    let id = req.body._id;
    Form.findOneAndDelete(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}



module.exports = FormService;