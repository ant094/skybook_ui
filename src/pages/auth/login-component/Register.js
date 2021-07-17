import React, { useState } from "react";
import './register.css'
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Form, Button, Modal} from "react-bootstrap";
import AuthApi from "../../../api/auth-login";

export const Register = (props) => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [passwordConfirmation, setPasswordConfirmation] = useState("");
 const [RegisterMessage, setRegisterMessage] = useState("");

 const handleRegister = async (data) => {
   const registerStatus = await AuthApi.register(data);
   if(registerStatus.errors){
     setRegisterMessage(registerStatus.errors);
    }
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   let data = {
     name: name,
     email: email,
     password: password,
     password_confirmation: passwordConfirmation,
   };
   handleRegister(data); 
 };

 
const handleRegisterWithProvider = async (data, provider) => {
  const registerStatus = await AuthApi.registerWithProvider(data, provider);
  setRegisterMessage(registerStatus);
};
const responseGoogle = (response) => {
  const data = {
    email: response.dt.Nt,
    token: response.accessToken,
  };
  console.log(data);
  handleRegisterWithProvider(data, "google");
};

const responseFacebook = (response) => {
  console.log(response); 
  const data = {
    email: response.email,
    token: response.accessToken,
  };
  handleRegisterWithProvider(data, "facebook");
};

  return (
    <>
      <Modal show={props.show} size="sm" onHide={() => props.handleClose()}>
        <Modal.Header closeButton closeLabel={""}>
          <Modal.Title>
            <div className="registerTitle">
              <h1>Daftar</h1>
              <h2>Daftar cepat dan mudah</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Text className="text-danger">
                {RegisterMessage?.name !== "undefined"
                  ? RegisterMessage?.name
                  : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-danger">
                {RegisterMessage?.email !== "undefined"
                  ? RegisterMessage?.email
                  : ""}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Kata Sandi"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-danger">
                {RegisterMessage?.password !== "undefined"
                  ? RegisterMessage?.password
                  : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Control
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="Konfirmasi Kata Sandi"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <Form.Text className="text-danger">
                {RegisterMessage?.password_confirmation !== "undefined"
                  ? RegisterMessage?.password_confirmation
                  : ""}
              </Form.Text>
            </Form.Group>
            <div className="d-grid gap-2 mb-3 mt-1">
              <Button id="register" type="submit" size="">
                Buat Akun Baru
              </Button>

              <p className="text-center mb-1">Atau Daftar Dengan</p>
              <GoogleLogin
                clientId="458456914945-n6m3evan8k2ovagei6mnd4o3tpvlkfed.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
              <FacebookLogin
                appId="1120589045104588"
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                textButton=" Login"
                icon="fa-facebook"
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

