import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { FormSteps, Management } from "./pages";
import { DefaultRoute } from "./components";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/management/studies" />
      <DefaultRoute path="/form/new" component={FormSteps} />
      <DefaultRoute path="/form/edit" component={FormSteps} />
      <DefaultRoute path="/management" component={Management} />
      <Redirect to="/management/studies" />
    </Switch>
  );
};

export default Routes;
