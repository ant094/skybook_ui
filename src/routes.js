import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Home } from "./pages/dashboard/Home";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard/home" component={Home} />
        {/* <Route exact path="/reports/:reportId" component={ReportDetail} /> */}
      </Switch>
    </Router>
  );
}
