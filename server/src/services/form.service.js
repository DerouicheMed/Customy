const Form = require("../models/form");
const Question = require("../models/question");
const Response = require("../models/response");
const Study = require("../models/study");
const mongoose = require("mongoose");
const MailService = require("./mail.service");
const GroupService = require("./group.service");

const mailService = new MailService();
const groupService = new GroupService();

class FormService {
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
    return await this.update(data)
  };

  getByStudy = async (studyId) => {
    return await Form.find({ study: { _id: studyId } });
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

FormService.prototype.getById = (req, res) => {
  let id = req.params.id;
  Form.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

FormService.prototype.add = (req, res) => {
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
            image: question.file,
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

FormService.prototype.delete = (req, res) => {
  let id = req.body._id;
  Form.findOneAndDelete(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = FormService;
