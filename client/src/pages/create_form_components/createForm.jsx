import React, { Component } from "react";
import QuestionAddedTable from './questionAddedTable';
import FormStepper from './formStepper'

import {CreateFormProvider as Provider} from '../../contexts/createFormContext';
 
class CreateForm extends Component { 

  render() {
    return (
      <Provider>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <FormStepper />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default CreateForm;
