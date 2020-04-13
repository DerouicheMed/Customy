import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Navbar, Sidebar } from "../../layout";

const DefaultRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "/js/custom.min.js";
    script1.async = true;
    //script1.onload = () => window.A.sort();
    document.body.appendChild(script1);
    const script2 = document.createElement("script");
    script2.src = "/js/sidebarmenu.js";
    script2.async = true;
    //script2.onload = () => window.A.sort();
    document.body.appendChild(script2);
  }, []);

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className="DefaultLayout">
          <Navbar />
          <Sidebar />
          <div class="page-wrapper" style={{ background: "white!important" }}>
            <Component {...matchProps} />
          </div>
        </div>
      )}
    />
  );
};

export default DefaultRoute;
