import React, {  useState } from "react";
import AuthApi from "../../../Api/auth-login";
import "./index.css";
import { GoogleLogin } from "react-google-login"; 
import FacebookLogin from "react-facebook-login";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Register } from "../../../Components/Auth/Register";

export const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showAlertRegisterSuccess, setShowAlertRegisterSuccess] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [login, setLogin] = useState(false);
  
  const token = localStorage.getItem('token');

  // Main login method
  const handleLogin = async (email, password) => {
    const loginResponse = await AuthApi.login(email, password);
    if (loginResponse.error) {
        helperLoginError()
    }
    if (loginResponse.access_token) {
     helperSetToken(loginResponse.access_token);
    }
  };

  const helperLoginError = () => {
      setLoginErrorMessage("User not register");
      setTimeout(() => {
        setLoginErrorMessage("");
      }, 5000);

      setPassword("");
  }

  const helperSetToken = async (token) => {
     await localStorage.setItem("token", token);
     const user = await AuthApi.user(token);
     await localStorage.setItem("id", user?.id);
     setLogin(true);
     if (props?.emailVerify == false) {
       props?.handleVerifyEmail(
         props.id,
         props.hasEmail,
         token
       );
     }
   }

  // Method Login
  const handleLoginEmail = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleLoginGoogle = (response) => {
  const email= response?.profileObj?.email;
    const password = response?.googleId;
    handleLogin(email, password);
  };

  const handleLoginFacebook = (response) => {
    const email = response.email;
    const password = response.accessToken;
    handleLogin(email, password);
  };

  // Show & Off Modal Register
  const handleCloseModalRegister = () => setShow(false);
  const handleShowModalRegister = () => setShow(true);

        return (
          <>
            {(token || login) && (props.emailVerify ?? true) && (
              <Redirect to="/dashboard" />
            )}

            <Alert
              show={showAlertRegisterSuccess}
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
                <Form onSubmit={(e) => handleLoginEmail(e)}>
                  <Form.Text className="text-danger ">
                    {loginErrorMessage !== "undefined" ? loginErrorMessage : ""}
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
                      onSuccess={(response) => handleLoginGoogle(response)}
                      onFailure={(response) => handleLoginGoogle(response)}
                      cookiePolicy={"single_host_origin"}
                    />
                    <FacebookLogin
                      appId="1120589045104588"
                      fields="name,email,picture"
                      cssClass="my-facebook-button-class"
                      textButton=" Login"
                      icon="fa-facebook"
                      callback={(response) => handleLoginFacebook(response)}
                    />
                    <hr />
                    <Button
                      variant="primary"
                      onClick={handleShowModalRegister}
                      id="register"
                    >
                      Buat Akun Baru
                    </Button>
                  </div>
                </Form>
              </div>
              <Register
                show={show}
                handleClose={handleCloseModalRegister}
                hadleShowAlertRegister={() => {
                  setShowAlertRegisterSuccess(true);
                  setTimeout(() => {
                    setShowAlertRegisterSuccess(false);
                  }, 5000);
                }}
              />
            </div>
          </>
        );
    
};
