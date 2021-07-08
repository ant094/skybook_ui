import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { ReactContext } from "../../routes";
import { Card } from "react-bootstrap";
import "./profile.css";
import post from "./post.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ProfilEdit } from "./profil-component/ProfilEdit";
import AuthApi from "../../api/auth-login";
import { NavigasiTop } from "./navigasi-component/NavigasiTop";
import { Post } from "./post-component/Post";
import { PostInput } from "./post-component/PostInput";
import DashboardApi from "../../api/api-dashboard";

export const Profil = () => {
  const [show, setShow] = useState(false);
  const [profilData, setProfilData] = useState(null);
  const [emailVerify, setEmailVerify] = useState(false);
  const handleLogout = async (token, handleLoginContext) => {
    const loginResponse = await AuthApi.logout(token);
    console.log(loginResponse);
    handleLoginContext(null);
    localStorage.clear();
  };
  const { id } = useParams();
  const getProfilData = async (id, token)=> {
    const dataProfil  = await DashboardApi.getDataProfilById(id, token)
    return dataProfil.success || dataProfil.message;
  }
   useEffect( () => {
     async function fetchData(){
       let data = await getProfilData(id, localStorage.getItem('token'));
        return data === "Your email address is not verified." ? setEmailVerify(true) :setProfilData(data);
       
     }
     fetchData();
   },[]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    console.log(profilData);
    console.log(emailVerify);
  const loadPosts = (data) =>{
   return data.map((data)=><Post data={data}/>)
  }
  return (
    <ReactContext.Consumer>
      {(value) => {
           const localStorageToken = value.state.token;
          
        if (!localStorageToken) {
          {/* return <Redirect to="/" />; */}
        }
        if (emailVerify) {
          return <Redirect to="/dashboard/email" />;
        }
      
        return (
          <>
            <NavigasiTop />
            <div id="main">
              <Card.Body className="profile">
                <img
                  src={post}
                  alt="Girl in a jacket"
                  className="profil-image"
                />
                <div className="profil-text">
                  <h1>{profilData ? profilData.name : ""}</h1>
                  <button onClick={handleShow}>Edit Profil</button>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    onClick={() =>
                      handleLogout(value.state.token, value.handleLogin)
                    }
                    className="profil-exit"
                  />
                  <div className="profil-follower">
                    <span>
                      {profilData ? profilData.total_posts : ""} Posts
                    </span>
                    <span>
                      {profilData ? profilData.total_followers : ""} Followers
                    </span>
                    <span>
                      {profilData ? profilData.total_following : ""} Following
                    </span>
                  </div>
                  <p>{profilData ? profilData.deskripsi : ""}</p>
                </div>
              </Card.Body>
              <PostInput />
              {profilData ? loadPosts(profilData.posts) : ""}
              <ProfilEdit show={show} handleClose={handleClose} />
            </div>
          </>
        );
      }}
    </ReactContext.Consumer>
  );
};
