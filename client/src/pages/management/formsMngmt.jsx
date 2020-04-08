import React, { useEffect,useRef, useHistory } from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import axios from "axios";
import { ManagementContext as Context } from "../../contexts/managementContext";
import PublishModal from "./publishModal";
import FormDetailsPanel from "./formDetailsPanel";

const FormsMngmt = ({ id }) => {
  const [title, setTitle] = React.useState('remember to load the study name ');
  const [management, setManagement] = React.useContext(Context);
  const ServerURL = process.env.REACT_APP_SERVER_URL;

  const modalButtonRef= useRef([]);

  useEffect(() => {
    axios
      .get(ServerURL + "/form")
      .then(({ data }) => {
        setManagement({
          ...management,
          forms: data,
        });
      })
      .catch((err) => console.log(err));
    management.studies.map((element) => {
      if (element._id === id) {
        setTitle(element.name);
      }
    });
  }, []);

  /**
   * this functions sets the columns in the table
   */
  const getColumns = () => {
    return [
      { title: "Title", field: "title" },
      { title: "Created At", field: "createdAt", editable: "never" },
      { title: "Last Updated", field: "updatedAt", editable: "never" },
    ];
  };

  /**
   * this function gets the form to be deleted, sends a request to delete that
   * form from database and filters it from the table displayed
   */
  const deleteForm = async (form) => {
    return await axios
      .delete(ServerURL + "/form", form)
      .then(({ data }) => {
        let prevForms = management.forms;
        prevForms = prevForms.filter((element) => element._id !== data._id);
        setManagement({
          ...management,
          forms: prevForms,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-md-12">
      <Link className="btn btn-light" to="/management/studies" style={{ margin: '5px 0' }} >
        <i className="fas fa-arrow-left" style={{ margin: 5 }}></i>
        Studies</Link>
        <MaterialTable
          title={title}
          columns={getColumns()}
          options={{ pageSize: 10 }}
          data={management.forms}
          actions={[
            {
              icon: "panorama",
              tooltip: "Preview",
              onClick: (event, rowData) => {
                
              },
            },
            {
              icon: "send",
              tooltip: "Publish",
              onClick: (event, rowData) => {
                modalButtonRef.current[0].click(event, rowData)
              },
            },
          ]}
          editable={{
            onRowDelete: (oldData) => deleteForm(oldData),
          }}
          detailPanel={[
            {
              tooltip: 'More Details',
              render: rowData => {
                return (
                  <FormDetailsPanel form={rowData}/>
                )
              },
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
        <button
          data-toggle="modal"
          data-target="#publish"
          style={{display : 'none'}}
          ref={element =>modalButtonRef.current[0]=element}
        >
        </button>
        <PublishModal />
      </div>
    </div>
  );
};

export default FormsMngmt;
