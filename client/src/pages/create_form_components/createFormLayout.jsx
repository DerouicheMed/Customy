import React, { Component } from "react";
import FormStepper from "./formStepper";
import { CreateFormProvider as Provider } from "../../contexts/createFormContext";

class CreateForm extends Component {
  render() {
    return (
      <Provider>
        <div className="container">
          <FormStepper />
        </div>
      </Provider>
    );
  }
}

export default CreateForm;
