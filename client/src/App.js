import React from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css//all.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ManagementLayout from "./pages/management/managementLayout";
import CreateFormLayout from "./pages/create_form_components/createFormLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route  path="/management">
          <ManagementLayout />
        </Route>
        <Route exact path="/form/new">
          <CreateFormLayout/>
        </Route>
        <Route exact path="/form/edit">
          <CreateFormLayout/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
