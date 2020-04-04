const Form = require('../models/form');
const Question = require('../models/question');
const Response = require('../models/response');
const Study = require('../models/study');
const mongoose = require('mongoose');

const QuestionService = require('./question.service');

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
    let newForm = new Form ({
        title : req.body.title,
        description : req.body.descriptiton,
        _id :mongoose.Types.ObjectId()
    })
    let questions = req.body.questions;      
    newForm.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            if (questions !== undefined && questions.length !== 0)  questions.map( question => {
                let newQuestion = new Question({
                    _id :mongoose.Types.ObjectId(),
                    text : question.text,
                    type : question.type,
                    image : question.file,
                    responses :question.responses,
                    form : { _id : result._id}
                })
                newQuestion.save((err,result) =>{
                    if(err){
                        res.send(err);
                    }
                })
        
            });
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