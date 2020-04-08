import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from "./datePicker";
import SelectUser from "./selectUsers";

import {ManagementContext as Context} from '../../contexts/managementContext';

const PublishModal = () => {

  const [management, setManagement] = React.useContext(Context);
  const [checkbox, setCheckbox] = React.useState({
    expires: true,
    allowAnonymous : false
  });

  const handleChecked = (event) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
  };

  const publishForm =() => {
    let form ={
      expiresAt : (checkbox.expires) ? management.selectedDate : null,
      allowAnonymous : checkbox.allowAnonymous
    }
    console.log (form)
  }

  return (
    <div id="publish" className="modal" tabIndex="-1" role="dialog">
      <div
        className="modal-dialog"
        role="document"
        style={{ maxWidth: "800px" }}
      >
        <div className="modal-content">
          <div className="modal-header" style={{borderBottom : 'none'}}>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              style={{ padding: "2px 4px" }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/******* Modal body starts here ***********/}
          <div className="modal-body">
            {/******* Date picker ***********/}
            <div className="form-group">
              <label>Expiration Date</label>  <br/>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkbox.expires}
                    onChange={handleChecked}
                    name="expires"
                    color="primary"
                  />
                }
                label="This form has an expiration date"
              />            
              {(checkbox.expires) ?  <DatePicker /> : <></>}
              <small  className="form-text text-muted">This will determine the date on which the form will be considered closed</small>
            </div>
            {/******* Allow annymous checkbox ***********/}
            <div className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkbox.allowAnonymous}
                    onChange={handleChecked}
                    name="allowAnonymous"
                    color="primary"
                  />
                }
                label="Allow anonymous sharing"
              />
              <small  className="form-text text-muted">If checked, anyone with a link to this form can access it</small>
            </div>
            {/******* Allow annymous checkbox ***********/}
            <div className="form-group">
            <label>Select Users</label> 
              <SelectUser/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={publishForm}>
              Publish This Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
