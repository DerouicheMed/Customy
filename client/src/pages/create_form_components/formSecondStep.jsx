import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";
import QuestionAddedTable from "./questionAddedTable";

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
      responses: []
    };
    questions.push(question);
    setForm({ ...form, formQuestions: questions });
    console.log(form);
    e.preventDefault();
  };
  return (
    <React.Fragment>
      <div className="form-group">
        <label>You can start adding questions to your form here</label>
      </div>
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
      <div className="form-group">
        <label>Response Type</label> <br />
        <div className=" btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active" onClick={onTypeChange}>
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
          <label className="btn btn-secondary" onClick={onTypeChange}>
            <input
              type="radio"
              name="options"
              value="rating"
              onClick={onTypeChange}
            />
            <i className="fas fa-star"></i>
            <br /> Rating
          </label>
          <label className="btn btn-secondary">
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
      {form.questionType === "multiple" && (
        <React.Fragment>
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
          <div className="form-group">
        <button className="btn btn-secondary" onClick={onAddNewQuestion}>
          Add response
        </button>
      </div>
        </React.Fragment>
      )}
      <div className="form-group">
        <button className="btn btn-secondary" onClick={onAddNewQuestion}>
          Add this Question
        </button>
      </div>
      <div className="form-group">
        <QuestionAddedTable />
      </div>
    </React.Fragment>
  );
};

export default FormSecondStep;
