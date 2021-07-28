import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Containers/Auth/Login";
import { VerifyEmail } from "./Containers/Auth/VerifyEmail";
import { Home } from "./Containers/Dashboard/Home";
import { Profil } from "./Containers/Dashboard/Profil";

export const Routes = () => {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/verify-email/:id/:hasEmail"
            component={VerifyEmail}
          />
          <Route exact path="/dashboard" component={Home} />
          <Route path="/dashboard/profil/:id" component={Profil} />
        </Switch>
      </Router>
  );
}
