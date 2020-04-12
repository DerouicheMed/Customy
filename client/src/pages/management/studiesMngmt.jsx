import React,{useEffect} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { ManagementContext as Context } from "../../contexts/managementContext";
import { useHistory } from "react-router-dom";

const StudiesMngmt = () => {

  const [management, setManagement] = React.useContext(Context);
  const [loading,setLoading]=React.useState(false);
  const ServerURL = process.env.REACT_APP_SERVER_URL ;
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios
      .get(ServerURL+"/study")
      .then(({ data }) => {
        setManagement({
          studies: data,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   * this functions sets the columns in the table
   */
  const getColumns = () => {
    return [
      { title: "Name", field: "name" },
      { title: "Created At", field: "createdAt", editable: "never" },
      { title: "Last Updated", field: "updatedAt", editable: "never" },
    ];
  };

  /**
   * this function gets the new study to be added,
   * sends a request to add the new study
   * adds the new study to the studies list to be displayed in table
   */
  const addNewStudy = async (study) => {
    return await axios
      .post(ServerURL+"/study", study)
      .then(({ data }) => {
        let prevStudies = management.studies;
        prevStudies.push(data);
        setManagement({
          ...management,
          studies: prevStudies,
        });
      })
      .catch((err) => console.log(err));
  };

  /**
   * this function gets the study to be updated, sends a request with the new study
   * to update in database and updates it in the table displayed
   */
  const updateStudy = async (newStudy, oldStudy) => {
    console.log(newStudy._id)
    return await axios
      .put(ServerURL+"/study", newStudy)
      .then(({ data }) => {
        setManagement((prevManagement) => {
          const studies = [...prevManagement.studies];
          studies[studies.indexOf(oldStudy)] = data;
          return { ...prevManagement, studies: studies };
        });
      })
      .catch((err) => console.log(err));
  };

  /**
   * this function gets the study to be deleted, sends a request to delete that
   * study from database and filters it from the table displayed
   */
  const deleteStudy = async (study) => {
    console.log(study)
    return await axios
      .delete(ServerURL+"/study", {params: { id: study._id }})
      .then(({ data }) => {
        let prevStudies = management.studies;
        prevStudies = prevStudies.filter((element) => element._id !== data._id);
        setManagement({
          ...management,
          studies: prevStudies,
        });
      })
      .catch((err) => console.log(err));
  };

  const fetchForms =(studyId) =>{         
    history.push("/management/forms?id="+studyId);
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <MaterialTable
          title="Studies List"
          columns={getColumns()}
          data={management.studies}
          isLoading={loading}
          actions={[
            {
              icon: "folderOpenOutlined",
              tooltip: "Browse forms",
              onClick: (event, rowData) => fetchForms(rowData._id)
            },
            {
              icon: "assessment",
              tooltip: "Statistics",
              onClick: (event, rowData) => history.push('/statistics?id='+rowData._id)
            },
          ]}
          editable={{
            onRowAdd: (newData) => addNewStudy(newData),
            onRowUpdate: (newData, oldData) => updateStudy(newData, oldData),
            onRowDelete: (oldData) => deleteStudy(oldData),
          }}  
          options={{
            pageSize: 10,
            actionsColumnIndex: -1
          }}        
        />
      </div>
    </div>
  );
};

export default StudiesMngmt;
