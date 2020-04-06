import React from "react";
import StudiesMngmt from "./studiesMngmt";

import { ManagementProvider as Provider } from "../../contexts/managementContext";

const ManagementLayout = () => {
  return (
    <Provider>
      <div className="container">
        <StudiesMngmt />
      </div>
    </Provider>
  );
};

export default ManagementLayout;
