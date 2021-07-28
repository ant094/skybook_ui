import React, { useState } from "react";
import './index.css'
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Form, Button, Modal} from "react-bootstrap";
import AuthApi from "../../../Api/auth-login";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [RegisterErrorMessage, setRegisterErrorMessage] = useState("");
  const [RegisterErrorMessageAlready, setRegisterErrorMessageAlready] = useState("");

  // Main Register Email
  const handleRegister = async (data) => {
    const registerStatus = await AuthApi.register(data);
    if (registerStatus.errors) {
      setRegisterErrorMessageAlready("");
      setRegisterErrorMessage(registerStatus.errors);
    } else if (registerStatus.error === "user registered") {
      setRegisterErrorMessage("");
      setRegisterErrorMessageAlready(registerStatus);
    } else {
      handleCloseRegisterModal();
    }
  };

  // Main Register Provider Facebook & Google
  const handleRegisterWithProvider = async (data, provider) => {
    const registerStatus = await AuthApi.registerWithProvider(data, provider);
    if (registerStatus.error === "user registered") {
      console.log(registerStatus.error);
      setRegisterErrorMessage("");
      setRegisterErrorMessageAlready(registerStatus);
    } else {
      handleCloseRegisterModal();
    }
  };

  // Register Method
  const handleRegisterEmail = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    handleRegister(data);
  };
  const handleRegisterGoogle = async (response) => {
    const data = {
      email: response?.profileObj?.email,
      token: response?.accessToken,
    };
    await handleRegisterWithProvider(data, "google");
  };
  const handleRegisterFacebook = (response) => {
    console.log(response);
    const data = {
      email: response?.email,
      token: response?.accessToken,
    };
    handleRegisterWithProvider(data, "facebook");
  };

  const handleCloseRegisterModal = () => {
    props.handleClose();
    props.hadleShowAlertRegister();
    setRegisterErrorMessage("");
    setRegisterErrorMessageAlready("");
  };

  return (
    <>
      <Modal show={props.show} size="sm" onHide={() => handleCloseRegisterModal()}>
        <Modal.Header closeButton closeLabel={""}>
          <Modal.Title>
            <div className="registerTitle">
              <h1>Daftar</h1>
              <h2>Daftar cepat dan mudah</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleRegisterEmail(e)}>
            <Form.Group className="mb-3 text-center">
              <Form.Text className=" text-danger ">
                {RegisterErrorMessageAlready !== "" ? "user already register" : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Text className="text-danger">
                {RegisterErrorMessage?.name !== "undefined"
                  ? RegisterErrorMessage?.name
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
                {RegisterErrorMessage?.email !== "undefined"
                  ? RegisterErrorMessage?.email
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
                {RegisterErrorMessage?.password !== "undefined"
                  ? RegisterErrorMessage?.password
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
                {RegisterErrorMessage?.password_confirmation !== "undefined"
                  ? RegisterErrorMessage?.password_confirmation
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
                buttonText="Daftar"
                onSuccess={handleRegisterGoogle}
                onFailure={handleRegisterGoogle}
              />
              <FacebookLogin
                appId="1120589045104588"
                fields="name,email,picture"
                callback={handleRegisterFacebook}
                cssClass="my-facebook-button-class"
                textButton=" Daftar"
                icon="fa-facebook"
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

