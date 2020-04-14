import React, { Component } from "react";
import FormStepper from "./formStepper";
import { FormProvider as Provider } from "../../contexts/formContext";

class CreateForm extends Component {
  render() {
    return (
      <Provider>
        <div className="container" style={{background : 'white'}}>
          <FormStepper />
        </div>
      </Provider>
    );
  }
}

export default CreateForm;
