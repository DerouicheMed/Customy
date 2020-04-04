import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

const ResponseAddedTable = () => {
  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function deletes the response added
   * to the question from the questionResponses list
   */
  const handleDelete = response => {
    let files = form.files;
    if (response.file.length !== 0)
      files = files.filter(file =>  file.name !== response.file);
    let responses = form.questionResponses;
    responses = responses.filter(element => !(element.text === response.text));
    setForm({ ...form, questionResponses: responses, files : files });
  };

  /**
   * this funtions will test if the question list is empty it will desplay
   * a no question message else it will display the added questions in a table
   */
  const renderResponses = () => {
    const responses = form.questionResponses;
    if (responses === undefined || responses.length === 0) {
      return <div>(*) No responses added to this question yet</div>;
    } else {
      return (
        <table className="table responses-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Response</th>
              <th scope="col">File</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(response => {
              return (
                <tr key={Math.random()}>
                  <td>#</td>
                  <td>{response.text}</td>
                  <td>{(response.file ===undefined || response.file === null) ? 0 : 1}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(response)}
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
  return <React.Fragment>{renderResponses()}</React.Fragment>;
};

export default ResponseAddedTable;
