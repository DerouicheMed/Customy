const Study = require('../models/study');
const mongoose = require('mongoose');

class StudyService {
}
 

StudyService.prototype.getAll = (req,res) => {
    Study.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

StudyService.prototype.getById = (req,res) => {
    let id = req.params.id;
    Study.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

StudyService.prototype.add = (req,res) => {
    let obj = req.body;
    let model = new Study(obj);
    model._id=mongoose.Types.ObjectId();
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

StudyService.prototype.update = (req,res) => {
    let id = req.body._id;
    let study = {
        name : req.body.name
    }
    Study.findOneAndUpdate({ _id : id},study,{new :true},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

StudyService.prototype.delete = (req,res) => {
    let id = req.query.id;
    Study.findOneAndDelete({ _id : id},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}



module.exports = StudyService;