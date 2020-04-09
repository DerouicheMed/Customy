import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "./datePicker";
import SelectGroups from "./selectGroups";

import { ManagementContext as Context } from "../../contexts/managementContext";

const PublishModal = () => {
  const [management, setManagement] = React.useContext(Context);
  const [checkbox, setCheckbox] = React.useState({
    expires: true,
    allowAnonymous: false,
  });

  /**
   * this function fires each time a checkbox is checked/unchecked
   * it gets the value and stores it in checkbox to indicate true or false
   */
  const handleChecked = (event) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
  };

  const checkExpirationDate = () => {
    let date=management.selectedDate;
    let nowDate = new Date();
    return (date === undefined || date === null) ? false : nowDate.getTime() < date.getTime() - 86400000 ;
  };

  const isReadyToPublish = () => {
    if (checkbox.expires && ! checkExpirationDate() ) return false;
    else if ( management.groups.length === 0) return false;
    else return true;
  }

  const publishForm = () => {
    let data = {
      expiresAt: checkbox.expires ? management.selectedDate : null,
      allowAnonymous: checkbox.allowAnonymous,
      groups: management.groups,
    };
    //console.log("form")
    console.log(isReadyToPublish());
  };

  return (
    <div id="publish" className="modal" tabIndex="-1" role="dialog">
      <div
        className="modal-dialog"
        role="document"
        style={{ maxWidth: "800px" }}
      >
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: "none" }}>
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
          {/******************************* Modal body starts here ****************************/}
          <div className="modal-body">
            {/************************* Date picker ******************************/}
            <div className="form-group">
              <label>Expiration Date</label> <br />
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
              {//if checkbox is checked
              checkbox.expires ? <DatePicker /> : <></>
              }
              {// if checkbox is checked and expiration date is not valid
              checkbox.expires && ! checkExpirationDate() ? (
                <small className="form-text " style={{color : 'red'}}>
                  Please choose a valid date ( at least 24 hours)
                </small>
              ) : (
                <></>
              )}
              <small className="form-text text-muted">
                This will determine the date on which the form will be
                considered closed
              </small>
            </div>
            {/********************* Allow annymous checkbox ************************/}
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
              <small className="form-text text-muted">
                If checked, anyone with a link to this form can access it
              </small>
            </div>
            {/*************************** Select user groups **************************/}
            <div className="form-group">
              <label>Select user groups to email the form</label>
              <SelectGroups />
            </div>
          </div>
          <div className="modal-footer">
            {/*************************** publish button **************************/
            (isReadyToPublish()) ?
            <button
              type="button"
              className="btn btn-primary"
              onClick={publishForm}
            >
              Publish This Form
            </button>
            :
            <button
              type="button"
              className="btn btn-secondary"
              disabled={true}
            >
              Publish This Form
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
