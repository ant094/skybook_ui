import React from "react";
import { Redirect } from "react-router-dom";
import { ReactContext } from "../../routes";
import "./home.css";
import { NavigasiTop } from "./navigasi-component/NavigasiTop";
import { PostInput } from "./post-component/PostInput";
import { Post } from "./post-component/Post";

export const Home = () => {
  
  return (
    <ReactContext.Consumer>
      {(value) => {
        console.log(localStorage.getItem('token'));
       const localStorageToken = value.state.token;
       if (!localStorageToken) {
         return <Redirect to="/" />;
       }
        return (
          <>
            <NavigasiTop />
            <div id="main" className=" mt-3">
              <PostInput />
             {false ? <Post/> :''}
            </div>
          </>
        );
      }}
    </ReactContext.Consumer>
  );
};
