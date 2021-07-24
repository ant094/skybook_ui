import React, { Component, createContext,  useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { EmailNotifyVerify, EmailVerify } from "./pages/dashboard/EmailNotifyVerify";
import { Home } from "./pages/dashboard/Home";
import { Profil } from "./pages/dashboard/Profil";


export const ReactContext = createContext();
const Provider = ReactContext.Provider;


export default class Routes extends Component {
  state = {
    token: localStorage.getItem('token'),
  };

  handleLogin = (dataToken) => {
    return this.setState({ token: dataToken });
  };

  render() {
    return (
      <Router>
        <Provider
          value={{
            state: this.state,
            handleLogin: this.handleLogin,
          }}
        >
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/verify-email/:id/:hasEmail" component={VerifyEmail} />
            <Route exact path="/dashboard" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard/email" component={EmailNotifyVerify} />
            <Route path="/dashboard/profil/:id" component={Profil} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}
