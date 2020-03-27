import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

const ResponseAddedTable = () => {

  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  const editQuestion = e =>{

  }

  const handleDelete = (question) =>{
      /*
    console.log(question);
    let questions = form.formQuestions;
    questions= questions.filter( element => 
      !(element.text == question.text && 
      element.type == question.type )
    );
    setForm({...form, formQuestions: questions });
    */
  }

  /**
   * this funtions will test if the question list is empty it will desplay
   * a no question message else it will display the added questions in a table
   */
  const renderQuestions = () => {
    const responses = form.questionResponses;
    if (responses === undefined || responses.length === 0) {
      return <div>No responses added yet</div>;
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Response</th>
              <th scope="col">File</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(response => {
              return (
                <tr key={Math.random()}>
                  <td>#</td>
                  <td>{response.text}</td>
                  <td>{(response.file.length ===0)? 0 : 1}</td>
                  <td><button type="button" className="btn btn-warning">Edit</button></td>
                  <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(response)}>Delete</button></td>
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
 
export default ResponseAddedTable;
