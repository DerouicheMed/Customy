import React, { useContext } from "react";
import { CreateFormContext as Context } from "../../contexts/createFormContext";

const FormThirStep = () => {
  /**
   * this gets the context from creatFormContext so we can use and edit the state
   */
  const [form, setForm] = useContext(Context);

  /**
   * this function returns the carousel indicator
   */
  const setIndicators = () => {
    let questions = form.formQuestions;
    return questions.map((question, index) => {
      return (
        <li
          key={index}
          data-target="#carousel-example-1z"
          data-slide-to={index}
          className={index === 0 ? "active" : ""}
        ></li>
      );
    });
  };

  /**
   * this function returns the carousel items containing the form's questions
   */
  const setItems = () => {
    let questions = form.formQuestions;
    return questions.map((question, index) => {
      return (
        <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
          <img
            className="d-block w-100"
            src="/img/formpreviewbackground.png"
            alt="First slide"
          />
          <div className="question-preview">
            {/****** form question card ******/}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{question.text}</h5>
                {question.file != undefined && question.file.length != 0 && (
                  <img
                    src="..."
                    className="card-img-top"
                    alt="image will appear here"
                  />
                )}
              </div>
              <ul className="list-group list-group-flush">
                { true && question.responses.map( (response, index) => {
                              return (
                                <li key={index} className="list-group-item"><small>{response.text}</small> </li>
                              )
                          })}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="row">
      <div className="offset-md-2 col-md-8 offset-md-2">
        <div
          id="carousel-example-1z"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          {/******** carousel indicators *******/}
          <ol className="carousel-indicators">{setIndicators()}</ol>
          {/******** carousel items *******/}
          <div className="carousel-inner" role="listbox">
            {setItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormThirStep;
