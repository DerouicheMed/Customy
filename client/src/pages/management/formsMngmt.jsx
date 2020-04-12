import React, { useEffect,useRef } from "react";
import MaterialTable from "material-table";
import { Link ,useHistory } from "react-router-dom";
import axios from "axios";
import { ManagementContext as Context } from "../../contexts/managementContext";
import PublishModal from "./publishModal";
import FormDetailsPanel from "./formDetailsPanel";

const FormsMngmt = ({ id }) => {
  const [title, setTitle] = React.useState('remember to load the study name ');
  const [loading,setLoading]=React.useState(false);
  const [management, setManagement] = React.useContext(Context);
  const ServerURL = process.env.REACT_APP_SERVER_URL;

  const modalButtonRef= useRef([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios
      .get(ServerURL + "/form/getbystudy/"+id)
      .then(({ data }) => {
        setManagement({
          ...management,
          forms: data,
        });
        setLoading(false);
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
      .delete(ServerURL + "/form/"+form._id)
      .then(() => {
        let prevForms = management.forms;
        prevForms = prevForms.filter((element) => element._id !== form._id);
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
          data={management.forms}
          isLoading={loading}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add Form',
              isFreeAction: true,
              onClick: (event) => history.push("/form/new?id="+id)
            },
            {
              icon: "panorama",
              tooltip: "Preview",
              onClick: (event, rowData) => {
                window.open('/form/new?id='+rowData._id);
              },
              
            },            
            rowData=>({
              icon: "send",
              tooltip: (rowData.publishedAt !== undefined && rowData.publishedAt !== null) ? "Already Published" : "Publish",
              disabled : rowData.publishedAt !== undefined && rowData.publishedAt !== null,
              onClick: (event, rowData) => {
                //this sets the selected from in context to the form on which 
                //the user clicked
                setManagement({
                  ...management,
                  selectedForm : rowData,
                  publishState : 'ready',
                  groups : [],
                  
                })
                modalButtonRef.current[0].click(event, rowData)
              },
              
            }),
            rowData=>({
              icon: "edit",
              tooltip: (rowData.publishedAt !== undefined && rowData.publishedAt !== null) ? "Can't Edit after publishing" : "Edit",
              disabled : rowData.publishedAt !== undefined && rowData.publishedAt !== null,
              onClick: (event, rowData) => {
                let studyId= rowData.study
                let formId=rowData._id;
                history.push({
                  pathname: '/form/edit',
                  search: '?id='+studyId+'&form='+formId
                });
              },
              
            })
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
          options={{
            pageSize: 10 ,
            actionsColumnIndex: -1
          }}
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
