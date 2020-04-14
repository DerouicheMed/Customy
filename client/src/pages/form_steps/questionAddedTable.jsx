import React, { useContext } from "react";
import { FormContext as Context } from "../../contexts/formContext";

const QuestionAddedTable = () => {
  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function sets the selected question to the state value so the controlled
   * inputs get their values
   */
  const loadQuestionToBeEdited = (question) => {

    let questions = form.formQuestions;
    let files = form.files;
    let file = null;
    let fileIndex = -1;

    questions.map((element, index) => {
      if (element.text === question.text) {
        if (files.length !== 0) {
          files.map((element, index) => {
            if (element.name === question.file) {
              fileIndex = index;
              file = element;
            }
          });
          files.splice(index,1);
        }
        setForm({
          ...form,
          questionText: question.text,
          questionFileName: question.file,
          questionFile : file,
          questionType: question.type,
          questionResponses: question.responses,
          questionIndex: index,
          files : files
        });
      }
    });
    console.log(form);
  };

  /**
   * this function filter the form questions list and delete the
   * selected question
   */
  const deleteQuestion = question => {
    let questions = form.formQuestions;
    let files = form.files;
    if (question.file.length !== 0)
      files = files.filter(file =>  file.name !== question.file);
    questions = questions.filter(
      element =>
        !(element.text === question.text && element.type === question.type)
    );
    setForm({ ...form, formQuestions: questions, files: files });
  };

  /**
   * this funtions will test if the question list is empty it will desplay
   * a no question message else it will display the added questions in a table
   */
  const renderQuestions = () => {
    const questions = form.formQuestions;
    if (questions === undefined || questions.length === 0) {
      return <div> * No question added to this form yet</div>;
    } else {
      return (
        <table className="table questions-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question header</th>
              <th scope="col">File</th>
              <th scope="col">Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => {
              return (
                <tr key={Math.random()}>
                  <td>#</td>
                  <td>{question.text}</td>
                  <td>{(question.file === undefined || question.file.length === 0)? 0 : 1}</td>
                  <td>{question.type}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{margin : '0 2px'}}
                      onClick={() => loadQuestionToBeEdited(question)}
                    >
                      <i className="fas fa-edit" style={{ color: "white" }}></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{margin : '0 2px'}}
                      onClick={() => deleteQuestion(question)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };
  return <React.Fragment>{renderQuestions()}</React.Fragment>;
};

export default QuestionAddedTable;
