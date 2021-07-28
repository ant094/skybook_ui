import React, {  useState } from "react";
import AuthApi from "../../../Api/auth-login";
import "./index.css";
import { GoogleLogin } from "react-google-login"; 
import FacebookLogin from "react-facebook-login";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { ReactContext } from "../../../routes";
import { Register } from "../../../Components/Auth/Register";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showAlertRegister, setShowAlertRegister] = useState(false);
  const [loginMessage, setloginMessage] = useState(null);
  const [login, setLogin] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogin = async (email, password) => {
    const loginResponse = await AuthApi.login(email, password);
    if (loginResponse.error) {
      setloginMessage("User not register");
       setTimeout(() => {
         setloginMessage("");
       }, 5000);
       
      setPassword("");
    }
    if (loginResponse.access_token) {
      await localStorage.setItem("token", loginResponse.access_token);
      setLogin(true);
      if (props?.emailVerify == false) {
        props?.handleVerifyEmail(
          props.id,
          props.hasEmail,
          loginResponse.access_token
        );
        console.log(props.emailVerify);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const responseGoogle = (response) => {
  const email= response?.profileObj?.email;
    const password = response?.googleId;
    handleLogin(email, password);
  };

  const responseFacebook = (response) => {
    const email = response.email;
    const password = response.accessToken;
    handleLogin(email, password);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

        return (
          <>
            {(token || login) && (props.emailVerify ?? true) && (
              <Redirect to="/dashboard" />
            )}

            <Alert
              show={showAlertRegister}
              variant="success"
              className="text-center register-success-alert"
            >
              Register Success
            </Alert>
            <div className="login">
              <div className="loginTitle">
                <h1>skybook</h1>
                <h2>
                  skybook membantu anda terhubung dan berbagi dengan orang-orang
                  dalam kehidupan anda.
                </h2>
              </div>
              <div className="loginForm text-center">
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Text className="text-danger ">
                    {loginMessage !== "undefined" ? loginMessage : ""}
                  </Form.Text>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      required
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 ">
                    <Form.Control
                      type="password"
                      required
                      name="password"
                      id="password"
                      placeholder="Kata Sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="">
                      Submit
                    </Button>
                    <p className="text-center mb-0">Atau login dengan </p>
                    <GoogleLogin
                      clientId="458456914945-n6m3evan8k2ovagei6mnd4o3tpvlkfed.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={(response) => responseGoogle(response)}
                      onFailure={(response) => responseGoogle(response)}
                      cookiePolicy={"single_host_origin"}
                    />
                    <FacebookLogin
                      appId="1120589045104588"
                      fields="name,email,picture"
                      cssClass="my-facebook-button-class"
                      textButton=" Login"
                      icon="fa-facebook"
                      callback={(response) => responseFacebook(response)}
                    />
                    <hr />
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      id="register"
                    >
                      Buat Akun Baru
                    </Button>
                  </div>
                </Form>
              </div>
              <Register
                show={show}
                handleClose={handleClose}
                hadleShowAlertRegister={() => {
                  setShowAlertRegister(true);
                  setTimeout(() => {
                    setShowAlertRegister(false);
                  }, 5000);
                }}
              />
            </div>
          </>
        );
    
};
