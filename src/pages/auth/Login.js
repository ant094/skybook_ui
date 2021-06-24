import React, { useState } from "react";
import AuthApi from "../../api/auth-login";
import { Redirect } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword ] = useState("");
  const [token, setToken ] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const dataRegiter = {
    email: "user2312@gmail.com231",
    password: "12345678",
    password_confirmation: "1234567",
  };
const data = {
     grant_type: 'password',
    client_id: '1',
    client_secret: 'eahf87pQUpE1PODPXmGpWTEwjLv934RqqMdRhaVR',
    username: email,
    password: password,
    scope: '',

}


  // await fetch("http://127.0.0.1:8000/api/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-Requested-With": "XMLHttpRequest",
  //   },
  //   body: JSON.stringify(dataRegiter),
  // })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return null;
  //   });

      await fetch("http://127.0.0.1:8000/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (result) => {
          const token = result.access_token;
          // setToken(result.access_token);
          console.log(result);
            await fetch("http://127.0.0.1:8000/api/home", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                setToken(result);
              })
              .catch((error) => {
                // common error
                console.log(error);
                return null;
              });
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
};

let button;
if(token){
  button = <Redirect to="/dashboard/home" />;
}

  return (
    <div>

       <h1>Halaman Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
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
        <input type="submit" name="submit" />
      </form> 
      
        
      {button}
    </div>
  );
};
