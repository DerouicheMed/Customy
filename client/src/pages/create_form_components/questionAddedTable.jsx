import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

const QuestionAddedTable = () => {

  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  const editQuestion = e =>{

  }

  const deleteQuestion = (question) =>{
    console.log(question);
    let questions = form.formQuestions;
    questions= questions.filter( element => 
      !(element.text == question.text && 
      element.type == question.type )
    );
    setForm({...form, formQuestions: questions });
  }

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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question header</th>
              <th scope="col">Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => {
              return (
                <tr key={Math.random()}>
                  <td>#</td>
                  <td>{question.text}</td>
                  <td>{question.type}</td>
                  <td><button type="button" className="btn btn-warning">Edit</button></td>
                  <td><button type="button" className="btn btn-danger" onClick={() => deleteQuestion(question)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };
  return ( <React.Fragment>{renderQuestions()}</React.Fragment> );
}
 
export default QuestionAddedTable;
