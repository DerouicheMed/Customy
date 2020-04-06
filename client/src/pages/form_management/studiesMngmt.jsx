import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { ManagementContext as Context } from "../../contexts/managementContext";
import { useEffect } from "react";

const StudiesMngmt = () => {
  const [studies, setStudies] = React.useContext(Context);
  const ServerURL = process.env.REACT_APP_SERVER_URL ;

  useEffect(() => {
    axios
      .get(ServerURL+"/study")
      .then(({ data }) => {
        setStudies({
          studies: data,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   * this functions sets the columns in the table
   */
  const getColumns = () => {
    return [
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
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
        let prevStudies = studies.studies;
        prevStudies.push(data);
        setStudies({
          ...studies,
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
    return await axios
      .put(ServerURL+"/study", newStudy)
      .then(({ data }) => {
        setStudies((prevStudies) => {
          const studies = [...prevStudies.studies];
          studies[studies.indexOf(oldStudy)] = data;
          return { ...prevStudies, studies: studies };
        });
      })
      .catch((err) => console.log(err));
  };

  /**
   * this function gets the study to be deleted, sends a request to delete that
   * study from database and filters it from the table displayed
   */
  const deleteStudy = async (study) => {
    return await axios
      .delete(ServerURL+"/study", study)
      .then(({ data }) => {
        let prevStudies = studies.studies;
        prevStudies = prevStudies.filter((element) => element._id !== data._id);
        setStudies({
          ...studies,
          studies: prevStudies,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <MaterialTable
          title="Studies List"
          columns={getColumns()}
          options={{ pageSize: 10 }}
          data={studies.studies}
          actions={[
            {
              icon: "folderOpenOutlined",
              tooltip: "Browse forms",
              onClick: (event, rowData) => {
                console.log(rowData);
              },
            },
          ]}
          editable={{
            onRowAdd: (newData) => addNewStudy(newData),
            onRowUpdate: (newData, oldData) => updateStudy(newData, oldData),
            onRowDelete: (oldData) => deleteStudy(oldData),
          }}
        />
      </div>
    </div>
  );
};

export default StudiesMngmt;
