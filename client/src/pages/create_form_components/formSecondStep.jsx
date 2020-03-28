import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

import QuestionAddedTable from "./questionAddedTable";
import ResponseAddedTable from "./responseAddedTable";

const FormSecondStep = () => {
  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function adds the inputs value into the state
   */
  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const onTypeChange = e => {
    setForm({
      ...form,
      questionType: e.target.value
    });
  };

  /**
   * this function joins the new added question to the question buffer to be added to the
   * form object later
   */
  const onAddNewQuestion = e => {
    let questions = form.formQuestions;
    let question = {
      text: form.questionText,
      file: form.questionFile,
      type: form.questionType,
      responses: form.questionResponses
    };
    questions.push(question);
    setForm({
      ...form,
      formQuestions: questions,
      questionText: "",
      questionFile: "",
      questionType: "yes/no",
      questionResponses: []
    });
    console.log(form);
    e.preventDefault();
  };

  /**
   * this function joins the new added response to the response list to be added to the
   * form object later
   */
  const onAddNewResponse = e => {
    console.log("hello");
    let responses = form.questionResponses;
    let response = {
      text: form.responseText,
      file: form.responseFile
    };
    responses.push(response);
    setForm({
      ...form,
      questionResponses: responses,
      responseText: "",
      responseFile: ""
    });
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>You can start adding questions to your form here</label>
          </div>
          {/********** Question text input ************/}
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              className="form-control"
              name="questionText"
              value={form.questionText}
              onChange={onChange}
            />
          </div>
          {/********** Question file input ************/}
          <div className="form-group">
            <label>Question Image</label>
            <input
              type="file"
              className="form-control"
              name="questionFile"
              value={form.questionFile}
              onChange={onChange}
            />
          </div>
          {/********** Question type radiobox ************/}
          <div className="form-group">
            <label>Type</label> <br />
            <div id="questionType-buttonGroup" className=" btn-group btn-group-toggle" data-toggle="buttons">
              {/*** yes/no button ***/}
              <label
                className="btn btn-light active"
                onClick={onTypeChange}
              >
                <input
                  type="radio"
                  name="options"
                  value="yes/no"
                  onClick={onTypeChange}
                />
                <i className="fas fa-check-circle"></i>
                <br />
                yes / No
              </label>
              {/*** ratiing button ***/}
              <label className="btn btn-light" onClick={onTypeChange}>
                <input
                  type="radio"
                  name="options"
                  value="rating"
                  onClick={onTypeChange}
                />
                <i className="fas fa-star"></i>
                <br /> Rating
              </label>
              {/*** multiple choices button ***/}
              <label className="btn btn-light">
                <input
                  type="radio"
                  name="options"
                  value="multiple"
                  onClick={onTypeChange}
                />
                <i className="fas fa-list"></i>
                <br /> Multiple Choices
              </label>
            </div>
          </div>
        </div>
      </div>

      {/**
       * This only gets loaded if the multiple choices button is active to display
       * the response text n file inputs
       */
      form.questionType === "multiple" && (
        <div className="row">
          <div className="col-md-6 col-sm-12">
            {/********** Response text input ************/}
            <div className="form-group">
              <label>Response</label>
              <input
                type="text"
                className="form-control"
                name="responseText"
                value={form.responseText}
                onChange={onChange}
              />
            </div>
            {/********** Response file input ************/}
            <div className="form-group">
              <label>Response Image</label>
              <input
                type="file"
                className="form-control"
                name="responseFile"
                value={form.responseFile}
                onChange={onChange}
              />
            </div>
            {/********** Add resposnse button ************/}
            <div className="form-group">
              <button className="btn btn-success" onClick={onAddNewResponse}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="">Responses added</label>
              <ResponseAddedTable />
            </div>
          </div>
        </div>
      )}
      <div className="row" style={{marginTop : 50, marginButtom : 50}}>
        <div className="col-md-12">
          {/********** Add question button ************/}
          <div className="form-group">
            <button className="btn btn-outline-primary" onClick={onAddNewQuestion}>
              <i className="fas fa-plus-circle" style={{margin : 5}}></i>
              Add this Question
            </button>
          </div>
          {/********** questions added list ************/}
          <div className="form-group">
            <QuestionAddedTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FormSecondStep;
