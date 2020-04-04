import React, { useContext } from "react";

import { CreateFormContext as Context } from "../../contexts/createFormContext";

const FormThirStep = () => {

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
   * this function returns the carousel items containing the form's preview
   * with all the questions and their responses
   */
  const setItems = () => {
    let questions = form.formQuestions;
    return questions.map((question, index) => {
      return (
        <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
          {/****** carousel background image ******/}
          <img
            className="d-block w-100"
            src="/img/formpreviewbackground.png"
            alt="First slide"
          />
          {/****** form question card ******/}
          <div className="question-preview">
            <div className="card">
              <div className="card-body">
                {/** question title **/}
                <h5 className="card-title">{question.text}</h5>
                {/**if question has a file a msg will be displayed  */
                question.file !== undefined && question.file.length !== 0 && (
                  <React.Fragment>
                    <i className="fas fa-image"></i> <small>contains image</small>
                  </React.Fragment>
                )}
              </div>
              <ul className="list-group list-group-flush">
                {//responses will be loaded here
                setQuestionResponsesPreview(question)}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  };

  /**
   * this function depending on the type of the question passed will return list elements
   * of the responses, yes or no, rating one to ten and if type is multiple it will go through
   * the responses list and list all the responses
   * @param {*} question this question is passed from the form's question list
   */
  const setQuestionResponsesPreview = question => {
    switch (question.type) {
      case "yes/no":
        return (
          <>
            <li key="1" className="list-group-item">
              <small>Yes</small>{" "}
            </li>
            <li key="2" className="list-group-item">
              <small>No</small>{" "}
            </li>
          </>
        );
      case "rating":
        return (
          <li key="1" className="list-group-item">
            <small>Rating from 1 to 10</small>{" "}
          </li>
        );
      case "multiple":
        return question.responses.map((response, index) => {
          return (
            <li key={index} className="list-group-item">
              <small>{response.text}</small> <br/>
              {/**if response has a file a msg will be displayed  */
                response.file !== undefined && response.file.length !== 0 && (
                  
                     <small><i className="fas fa-image"></i></small>
                )}
            </li>
          );
        });
    }
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
