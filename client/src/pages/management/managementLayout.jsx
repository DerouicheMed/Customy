import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  Redirect
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
          <Redirect exact from={`${path}`} to="/management/studies"/>
          <Route path={`${path}/studies`}>
            <StudiesMngmt />
          </Route>
          <Route path={`${path}/forms`}>
            <FormsMngmt id={query.get("id")} />
          </Route>
          <Redirect to="/management/studies" />
        </Switch>
      </div>
    </Provider>
  );
};

export default ManagementLayout;
