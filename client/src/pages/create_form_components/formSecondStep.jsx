import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

import QuestionForm from "./questionForm";
import QuestionAddedTable from "./questionAddedTable";

const FormSecondStep = () => {
  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function joins the new added question to the question buffer to be added to the
   * form object later
   */
  const addQuestion = e => {
    let questions = form.formQuestions;
    let files = form.files;
    let file =form.questionFile;
    if  (file !== undefined && file !== null) files.push(file);
    let question = {
      text: form.questionText,
      file: (file ===undefined || file === null) ? '' : file.name,
      type: form.questionType,
      responses: form.questionType === "multiple" ? form.questionResponses : []
    };
    questions.push(question);
    setForm({
      ...form,
      formQuestions: questions,
      questionText: "",
      questionFile: null,
      questionType: "yes/no",
      questionResponses: [],
      files : files
    });
    console.log(form);
    e.preventDefault();
  };

  /**
   * this function loads the submit button under the form inputs
   * in case its a new question the add question button will be displayed
   * in case its a question to be edited the edit question and cancel button will be
   * displayed
   */
  const loadQuestionButton = () => {
    if (form.questionIndex === -1)
      return (
        <button
          className="btn btn-outline-primary"
          onClick={addQuestion}
          disabled={
            form.questionText.length === 0 ||
            (form.questionType === "multiple" &&
              form.questionResponses.length === 0)
          }
        >
          <i className="fas fa-plus-circle" style={{ margin: 5 }}></i>
          Add this Question
        </button>
      );
    else
      return (
        <>
          <button className="btn btn-outline-success" onClick={editQuestion}>
            <i className="fas fa-pen" style={{ margin: 5 }}></i>
            Edit this Question
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={cancelEditQuestion}
          >
            Cancel
          </button>
        </>
      );
  };

  /**
   * this function edit the selected question in the form questions list
   */
  const editQuestion = () => {
    let questions = form.formQuestions;
    questions.forEach((element, index) => {
      if (index === form.questionIndex) {
        element.text = form.questionText;
        element.file = form.questionFile;
        element.type = form.questionType;
        element.responses =
          form.questionType === "multiple" ? form.questionResponses : [];
      }
    });
    setForm({
      ...form,
      formQuestions: questions,
      questionText: "",
      questionFile: "",
      questionType: "yes/no",
      questionResponses: [],
      questionIndex: -1
    });
    console.log(questions);
    console.log(form);
  };

  /**
   * this function initialize the input fields and sets question index to -1
   * to indicate that no question is not being edited
   */
  const cancelEditQuestion = () => {
    setForm({
      ...form,
      questionText: "",
      questionFile: "",
      questionType: "yes/no",
      questionResponses: [],
      questionIndex: -1
    });
  };

  return (
    <>
      {/************ question form inputs****************/}
      <QuestionForm />
      <div className="row" style={{ marginTop: 50, marginButtom: 50 }}>
        <div className="col-md-12">
          {/********** Add question button ************/}
          <div className="form-group">{loadQuestionButton()}</div>
          {/********** questions added list ************/}
          <div className="form-group">
            <QuestionAddedTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSecondStep;
