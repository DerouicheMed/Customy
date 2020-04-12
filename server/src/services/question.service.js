const Question = require('../models/question');
const Form = require('../models/form');
const mongoose = require('mongoose');

class QuestionService {

    add = async (data) => {
        let model = new Question(data);
        model._id=mongoose.Types.ObjectId();
        return await model.save();
    }

    getByForm = async (id) => {
        return await  Question.find({"form" : { "_id" : id}})
    }
    
    deleteByForm = async (id)=>{
        return await Question.deleteMany({ form: { _id: id } });
    }
}
 

QuestionService.prototype.getAll = (req,res) => {
    Question.find({},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

QuestionService.prototype.getById = (req,res) => {
    let id = req.params.id;
    Question.findById(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

QuestionService.prototype.getByForm = (req,res) => {
    let model = new Form(req.body);
    Question.find({"form" : { "_id" : model._id}},(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

/*
QuestionService.prototype.add = (req,res) => {
    let model = new Question(req.body);
    model._id=mongoose.Types.ObjectId();
    model.save((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}
*/

QuestionService.prototype.update = (req,res) => {
    let id = req.body._id;
    Question.findOneAndUpdate(id,req.body,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

QuestionService.prototype.delete = (req,res) => {
    let id = req.body._id;
    Question.findOneAndDelete(id,(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}

module.exports = QuestionService;