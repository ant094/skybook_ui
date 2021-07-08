import React, { Component, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Home } from "./pages/dashboard/Home";


export const ReactContext = createContext();
const Provider = ReactContext.Provider;


export default class Routes extends Component {

  state = {
    token : "",
  }

  handleLogin = (dataToken) => {
    return this.setState({token : dataToken});
  }

  render() {
    return (
      <Router>
        <Provider
          value={{
            state: this.state,
            handleLogin : this.handleLogin
          }}
        >
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/dashboard/home" component={Home} />
            <Route path="/dashboard/profil" component={Home} />
            <Route path="/register" component={Register} />
            {/* <Route exact path="/reports/:reportId" component={ReportDetail} /> */}
          </Switch>
        </Provider>
      </Router>
    );
  }
}
