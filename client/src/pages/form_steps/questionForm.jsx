import React, { useContext, useRef } from "react";
import { FormContext as Context } from "../../contexts/formContext";
import ResponseAddedTable from "./responseAddedTable";

const QuestionForm = () => {

  const [form, setForm] = useContext(Context);
  const inputFileRef= useRef([]);

  /**
   * this function adds the text inputs value into the context state
   */
  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /**
   * this function adds the file inputs value into the context state
   */
  const onFileChange = e => {
    let file =e.target.files[0];   
    console.log(file); 
    setForm({
      ...form,
      [e.target.name]: file,
      [e.target.name+'Name']: (file === undefined || file === null) ? '' : file.name 
    });
  };

  /**
   * this function adds the radio inputs values into the context state
   */
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

    let responses = form.questionResponses;
    let files = form.files;
    let file =form.responseFile;

    if  (file !== undefined && file !== null) files.push(file);
    let response = {
      text: form.responseText,
      file: form.responseFileName
    };
    responses.push(response);
    setForm({
      ...form,
      questionResponses: responses,
      responseText: "",
      responseFileName : "",
      responseFile: null,
      files : files
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
            <input
              type="file"
              className="form-control"
              name="questionFile"
              onChange={onFileChange}
              ref={element =>inputFileRef.current[0]=element}
              style={{display : 'none'}}
            />
            <button
              className="btn btn-secondary"
              onClick={()=>inputFileRef.current[0].click()}
            >
              <i className="fas fa-cloud-upload-alt" style={{ margin: 5 }}></i>
              { (form.questionFileName === undefined || form.questionFileName.length === 0) ? 'Upload image' : form.questionFileName}
            </button>
          </div>
          {/********** Question type radiobox ************/}
          <div className="form-group">
            <label>Type</label> <br />
            <div
              id="questionType-buttonGroup"
              className=" btn-group btn-group-toggle"
              data-toggle="buttons"
            >
              {/*** yes/no button ***/}
              <label
                className={
                  form.questionType === "yes/no"
                    ? "btn btn-light active"
                    : "btn btn-light"
                }
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
              <label
                className={
                  form.questionType === "rating"
                    ? "btn btn-light active"
                    : "btn btn-light"
                }
              >
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
              <label
                className={
                  form.questionType === "multiple"
                    ? "btn btn-light active"
                    : "btn btn-light"
                }
              >
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
              <input
                type="file"
                className="form-control"
                name="responseFile"
                onChange={onFileChange}
                ref={element=>inputFileRef.current[1] = element}
                style={{display : 'none'}}
              />
              <button
              className="btn btn-secondary"
              onClick={()=>inputFileRef.current[1].click()}
            >
              <i className="fas fa-cloud-upload-alt" style={{ margin: 5 }}></i>
              { ( form.responseFile === undefined || form.responseFile === null ) ? 'Upload image' : form.responseFile.name}
            </button>
            </div>
            {/********** Add resposnse button ************/}
            <div className="form-group" style={{ textAlign: "right" }}>
              <button
                className="btn btn-outline-success"
                onClick={onAddNewResponse}
                disabled={form.responseText.length === 0}
              >
                <i className="fas fa-plus-circle" style={{ margin: 5 }}></i>
                Add response to this question
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
};

export default QuestionForm;
