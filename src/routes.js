import React, { Component, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Containers/Auth/Login";
import { VerifyEmail } from "./Containers/Auth/VerifyEmail";
import { Home } from "./Containers/Dashboard/Home";
import { Profil } from "./Containers/Dashboard/Profil";


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
            <Route path="/dashboard/profil/:id" component={Profil} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}
