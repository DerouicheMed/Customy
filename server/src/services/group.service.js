const Group = require("../models/group");
const mongoose = require("mongoose");
const User = require("../models/user");

class GroupService {

  findById = async (id) => {    
    let users = [];
    let group = await Group.findById(id).catch((err)=>{ return err});  
    group = await this.getUsers(group).catch(err =>{ return err});
    return(group);
  };

  getUsers = async (group) => {
    let users = []; 
    for (let userId in group.users) {
      users.push(await User.findById(group.users[userId]).catch((err)=>console.log(err)));
    }
    group.users = users;
    return (group);
  };

}

GroupService.prototype.getAll = (req, res) => {
  Group.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};



GroupService.prototype.add = (req, res) => {
  let obj = req.body;
  let model = new Group(obj);
  model._id = mongoose.Types.ObjectId();
  model.save((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

GroupService.prototype.update = (req, res) => {
  let id = req.body._id;
  let group = {
    name: req.body.name,
    users: req.body.users,
  };
  Group.findOneAndUpdate({ _id: id }, group, { new: true }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

GroupService.prototype.delete = (req, res) => {
  let id = req.query.id;
  Group.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = GroupService;
