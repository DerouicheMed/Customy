import React,{useContext} from 'react';

import { CreateFormContext as Context } from "../../contexts/createFormContext";
import ResponseAddedTable from "./responseAddedTable";

const QuestionForm = () => {

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
        <>
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
                className={(form.questionType === 'yes/no') ? "btn btn-light active" : "btn btn-light" }
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
              {/*** rating button ***/}
              <label className={(form.questionType === 'rating') ? "btn btn-light active" : "btn btn-light" } >
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
              <label className={(form.questionType === 'multiple') ? "btn btn-light active" : "btn btn-light" }>
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
            <div className="form-group" style={{textAlign : 'right'}}>
              <button className="btn btn-outline-success" onClick={onAddNewResponse}>
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
        </>
      );
}
 
export default QuestionForm;