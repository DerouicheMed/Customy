import React, { Component } from "react";

class CreateForm extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col md 12">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                            aria-controls="home" aria-selected="true">Step 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                            aria-controls="profile" aria-selected="false">Step 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                            aria-controls="contact" aria-selected="false">Step 3</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <form action="">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group">
                                <label for="">To create a form please start by entering the form title and
                                    description</label>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Form Title *</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Description</label>
                                <textarea className="form-control" name="" rows="10"></textarea>
                            </div>
                            <div className="form-group" style={{textAlign : 'right'}}>
                                <button className=" btn btn-primary">Next</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="form-group">
                                <label for="exampleInputEmail1">You can start adding questions to your form here</label>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Question</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Question Image</label>
                                <input type="file" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Response Type</label>
                                <div className="form-control btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-secondary active">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked/>
                                         Yes
                                        / No
                                    </label>
                                    <label className="btn btn-secondary">
                                        <input type="radio" name="options" id="option2" autocomplete="off"/> Rating
                                    </label>
                                    <label className="btn btn-secondary">
                                        <input type="radio" name="options" id="option3" autocomplete="off"/> Multiple
                                        Choices
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-secondary">Add this Question</button> 
                            </div>
                            <hr/>
                            <div className="form-group">
                                <label for="">Questions added to this form</label>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                    </form>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateForm;
