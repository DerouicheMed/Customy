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
    console.log(obj);
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
    Study.findOneAndUpdate(id,req.body,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

StudyService.prototype.delete = (req,res) => {
    let id = req.body._id;
    Study.findOneAndDelete(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}



module.exports = StudyService;