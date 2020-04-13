import React from "react";
import "./App.css";
import "./style.css";
import "../node_modules/@fortawesome/fontawesome-free/css//all.min.css";
import { BrowserRouter as Router} from "react-router-dom";
import Routes from './routes'

function App() {
  return (
    <Router>
      <Routes/>
    </Router>
  );
}

export default App;
