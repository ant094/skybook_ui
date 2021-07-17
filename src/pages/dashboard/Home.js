import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { ReactContext } from "../../routes";
import "./home.css";
import { NavigasiTop } from "./navigasi-component/NavigasiTop";
import { PostInput } from "./post-component/PostInput";
import { Post } from "./post-component/Post";
import CONFIG from "../../config/config";
import DashboardApi from "../../api/api-dashboard";

export const Home = () => {
   const { id } = useParams();
   const [show, setShow] = useState(false);
   const [profilData, setProfilData] = useState(null);
   const [emailVerify, setEmailVerify] = useState(false);
    const loadPosts = (data, token) => {
      return data.posts.map((data) => (
        <Post key={data.id} token={token} data={data} />
      ));
      // console.log(data["0"])
      // for (let index = 0; index < data.length; index++) {
      //  return (
      //    <Post
      //      key={data[`${index}`].id}
      //      token={token}
      //      data={data[`${index}`]}
      //    />
      //  );
      // }
    };
const getHome = async (token) =>
  await DashboardApi.getHome( token);
   useEffect(() => {
     async function fetchData() {
       let data = await getHome(localStorage.getItem("token"));
       if (data?.message === "Your email address is not verified.") {
         setEmailVerify(true);
       }
       return setProfilData(data);
     }
     fetchData();
   }, [id]);
  
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
            <NavigasiTop
              data={profilData}
            />
            <div id="main" className=" mt-3">
              <PostInput />
              {profilData ? loadPosts(profilData, value.state.token) : ""}
            </div>
          </>
        );
      }}
    </ReactContext.Consumer>
  );
};
