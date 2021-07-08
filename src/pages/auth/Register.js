import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import AuthApi from "../../api/auth-login";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const handleRegister = async (data) => {
    const registerStatus = AuthApi.register(data);
    setRegisterMessage(registerStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    handleRegister(data);
  };

const handleRegisterWithProvider = async (data, provider) => {
  const registerStatus = await AuthApi.registerWithProvider(data, provider);
  console.log(registerStatus );
  setRegisterMessage(registerStatus);
};
  const responseGoogle = (response) => {
    const data = {
      email: response.dt.Nt,
      token: response.accessToken,
    };
    handleRegisterWithProvider(data, "google");
  };

  const responseFacebook = (response) => {
    const data = {
      email: response.email,
      token: response.accessToken,
    };
    handleRegisterWithProvider(data, "facebook");
  };

  let button;
  if (registerMessage) {
    button = <Redirect to="/" />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Password Confirmation</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <input type="submit" name="submit" />
      </form>
      <GoogleLogin
        clientId="458456914945-n6m3evan8k2ovagei6mnd4o3tpvlkfed.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <FacebookLogin
        appId="1120589045104588"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      {button}
    </div>
  );
};
