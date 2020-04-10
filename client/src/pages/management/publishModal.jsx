import React, { useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DatePicker from "./datePicker";
import SelectGroups from "./selectGroups";
import axios from "axios";

import { ManagementContext as Context } from "../../contexts/managementContext";

const PublishModal = () => {
  const [management, setManagement] = React.useContext(Context);
  const [checkbox, setCheckbox] = React.useState({
    expires: true,
    allowAnonymous: false,
  });
  const ServerURL = process.env.REACT_APP_SERVER_URL;

  /**
   * this function fires each time a checkbox is checked/unchecked
   * it gets the value and stores it in checkbox to indicate true or false
   */
  const handleChecked = (event) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
  };

  const checkExpirationDate = () => {
    let date = management.selectedDate;
    let nowDate = new Date();
    return date === undefined || date === null
      ? false
      : nowDate.getTime() < date.getTime() - 86400000;
  };

  const isReadyToPublish = () => {
    if (checkbox.expires && !checkExpirationDate()) return false;
    else if (management.groups === undefined || management.groups.length === 0)
      return false;
    else return true;
  };

  const renderPublishButton = () => {
    switch (management.publishState) {
      case "ready":
        return (
          <button
            type="button"
            className="btn btn-primary"
            onClick={publishForm}
          >
            <i
              className="fas fa-cloud-upload-alt"
              style={{ margin: "5px" }}
            ></i>
            Publish This Form
          </button>
        );
      case "publishing":
        return (
          <button type="button" className="btn btn-light" disabled={true}>
            <div
              class="spinner-grow"
              role="status"
              style={{ width: "1rem", height: "1rem", margin: "0 5px" }}
            >
              <span class="sr-only">Loading...</span>
            </div>
            Publishing Please Wait . . .
          </button>
        );
      case "published":
        return (
          <button type="button" className="btn btn-success" disabled={true}>
            <i className="fas fa-check-circle" style={{ margin: "5px" }}></i>
            Form has been published
          </button>
        );
      case "error":
        return "An Error Accured While Publishing";
      default:
        return "Unknown Error !";
    }
  };

  const publishForm = () => {
    let data = {
      _id: management.selectedForm._id,
      publishedAt: new Date(),
      expiresAt: checkbox.expires ? management.selectedDate : null,
      allowAnonymous: checkbox.allowAnonymous,
      groups: management.groups,
    };

    axios
      .post(ServerURL + "/form/publish", data)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    console.log(data);
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
              {
                //if checkbox is checked
                checkbox.expires ? <DatePicker /> : <></>
              }
              {
                // if checkbox is checked and expiration date is not valid
                checkbox.expires && !checkExpirationDate() ? (
                  <small className="form-text " style={{ color: "red" }}>
                    Please choose a valid date ( at least 24 hours)
                  </small>
                ) : (
                  <></>
                )
              }
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
            {
              /*************************** publish button **************************/
              isReadyToPublish() ? (
                renderPublishButton()
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={true}
                >
                  <i
                    className="fas fa-cloud-upload-alt"
                    style={{ margin: "5px" }}
                  ></i>
                  Publish This Form
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
