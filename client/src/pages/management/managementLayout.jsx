import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useLocation
  } from "react-router-dom";

import StudiesMngmt from "./studiesMngmt";
import FormsMngmt from "./formsMngmt";

import { ManagementProvider as Provider } from "../../contexts/managementContext";

const ManagementLayout = () => {

  let { path, url } = useRouteMatch();
  let query = new URLSearchParams(useLocation().search);

  return (
    <Provider>
      <div className="container">
      <Switch>
        <Route  path={`${path}/studies`}>
          <StudiesMngmt/>
        </Route>
        <Route path={`${path}/forms`}>
       <FormsMngmt id={query.get("id")} />
        </Route>
      </Switch>
        
      </div>
    </Provider>
  );
};

export default ManagementLayout;
