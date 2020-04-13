const Form = require("../models/form");
const Question = require("../models/question");
const mongoose = require("mongoose");
const MailService = require("./mail.service");
const GroupService = require("./group.service");
const QuestionService = require("./question.service");

const mailService = new MailService();
const groupService = new GroupService();
const questionService = new QuestionService();

class FormService {
  getById = async (id) => {
    let form = await Form.findById(id);
    form.questions = await questionService.getByForm(id);
    return form;
  };

  update = async (form) => {
    let id = form._id;
    delete form._id;
    return await Form.findOneAndUpdate({ _id: id }, form, { new: true });
  };

  publish = async (data) => {
    let groups = data.groups;
    delete data.groups;
    groups.map((group) => {
      groupService
        .findById(group._id)
        .then((result) => {
          result.users.map((user) => {
            mailService.sendEmail(user);
          });
        })
        .catch((err) => console.log(err));
    });
    return await this.update(data);
  };

  getByStudy = async (studyId) => {
    return await Form.find({ study: { _id: studyId } });
  };

  delete = async (id) => {
    await Form.findOneAndDelete({ _id: id });
    await questionService.deleteByForm(id);
  };
}

FormService.prototype.getAll = (req, res) => {
  Form.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

FormService.prototype.add = (req, res) => {
  console.log("im in add");
  let newForm = new Form({
    title: req.body.title,
    description: req.body.description,
    study: req.body.study,
    _id: mongoose.Types.ObjectId(),
  });
  let questions = req.body.questions;
  newForm.save((err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (questions !== undefined && questions.length !== 0)
        questions.map((question) => {
          let newQuestion = new Question({
            _id: mongoose.Types.ObjectId(),
            text: question.text,
            type: question.type,
            file: question.file,
            responses: question.responses,
            form: { _id: result._id },
          });
          newQuestion.save((err, result) => {
            if (err) {
              res.send(err);
            }
          });
        });
      res.send(result);
    }
  });
};

FormService.prototype.edit = (req, res) => {
  //get form id
  let formId = req.body._id;
  //check again if form id is not null
  if (formId !== undefined && formId !== null) {
    //create form object to be passed to mongoose
    let form = new Form({
      title: req.body.title,
      description: req.body.description,
      study: req.body.study,
    });
    //get the form questions seperatly 
    let questions = req.body.questions;
    //update the existing form
    Form.findOneAndUpdate({ _id: formId }, form, { new: true }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        //delete all the questions belonging to that form
        Question.deleteMany({ form: { _id: formId } }, (err, result) => {
          if (err) res.send(err);
          else {
            //check if form questions list is not empty
            if (questions !== undefined && questions.length !== 0)
              //map the questions and save every question
              questions.map((question) => {
                let newQuestion = new Question({
                  _id: mongoose.Types.ObjectId(),
                  text: question.text,
                  type: question.type,
                  file: question.file,
                  responses: question.responses,
                  form: { _id: formId },
                });
                newQuestion.save((err, result) => {
                  if (err) {
                    res.send(err);
                  }
                });
              });
            else res.send(result);
          }
        });
      }
    });
  } else res.status("500").send();
};

module.exports = FormService;
