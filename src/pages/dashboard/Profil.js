import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { ReactContext } from "../../routes";
import { Card } from "react-bootstrap";
import "./profil.css";
import userDefault from "./../../images/default-system/user-default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ProfilEdit } from "./profil-component/ProfilEdit";
import AuthApi from "../../api/auth-login";
import { NavigasiTop } from "./navigasi-component/NavigasiTop";
import { Post } from "./post-component/Post";
import { PostInput } from "./post-component/PostInput";
import DashboardApi from "../../api/api-dashboard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CONFIG from "../../config/config";

export const Profil = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [profilData, setProfilData] = useState(null);
  const [emailVerify, setEmailVerify] = useState(false);
  const [follower, setFollower] = useState(false);
  const [like, setLike] = useState(0);
  const handleLogout = async (token, handleLoginContext) => {
    const loginResponse = await AuthApi.logout(token);
    console.log(loginResponse);
    handleLoginContext(null);
    localStorage.clear();
  };
  const getProfilData = async (id, token)=> await DashboardApi.getDataProfilById(id, token);
  const isFollower = async (user_follower_id, token) => {
  const follower = await DashboardApi.isFollowerById(user_follower_id,token)
    return setFollower(follower.success);
  }
  const MySwal = withReactContent(Swal);

   useEffect( () => {
     async function fetchData(){
       let data = await getProfilData(id, localStorage.getItem('token'));
        isFollower(id, localStorage.getItem("token"));
        console.log("profil-checkdawda " + id);
       if(data.message === "Your email address is not verified."){
          setEmailVerify(true);
       }
         return setProfilData(data.success);
     }
     fetchData();
   },[id, like]);
  const handleFollow = async (e, token) => {
    const userFollowerId = e.target.value;
    const followCheck =  await DashboardApi.postFollow(userFollowerId, token);
    if (followCheck === "follow success"){
        setFollower(true);
    } 
  }
  const handleUnfollow = async (e, token) => {
    const userFollowerId = e.target.value;
    const followCheck =  await DashboardApi.deleteUnfollow(userFollowerId, token);
    if (followCheck === "unfollow success"){
        setFollower(false);
    } 
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loadPosts = (data, token) =>{
   return data.map((data)=><Post key={data.id} token={token} data={data} like={(data)=>{setLike(data)}}/>)
  }
if(emailVerify)
{
    // MySwal.fire({
    //   title: <p>Mohon Verifikasi Email Terlebih Dahulu!</p>,
    //   showCloseButton: false,
    //   showCancelButton: false,
    //   showConfirmButton: false,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false,
    //   icon : 'warning',
    // });
}
console.log('profil-check '+profilData?.name ?? "");
console.log('profil-check '+id);
console.log('iin like '+like ?? '');

const viewBtnFollow = (isFollower, token )=>{
   if(isFollower){
    return (
      <button
        id="following"
        name="btn-follow"
        value={id}
        onClick={(e) => handleUnfollow(e, token)}
      >
        Following
      </button>
    );
   }else{
      return (
        <button
          id="follow"
          name="btn-follow"
          value={id}
          onClick={(e) => handleFollow(e, token)}
        >
          Follow
        </button>
      );
   }
}

  return (
    <ReactContext.Consumer>
      {(value) => {
           const localStorageToken = value.state.token;

        if (!localStorageToken) {
          return <Redirect to="/" />;
        }
        if (emailVerify) {
          {/* return <Redirect to="/dashboard/email" />; */}
        }
        return (
          <>
            <NavigasiTop
              data = {profilData}
            />
            <div id="main">
              <Card.Body className="profile">
                <img
                  src={`${CONFIG.BASE_URL_API_IMAGE}/${profilData?.profil_picture}`}
                  alt="Girl in a jacket"
                  className="profil-image"
                />
                <div className="profil-text">
                  <h1>{profilData?.name ?? ""}</h1>
                  {profilData?.id === parseInt(id) && (
                    <button onClick={handleShow}>Edit Profil</button>
                  )}
                  {profilData?.id !== parseInt(id) &&
                    viewBtnFollow(follower, value.state.token)}

                  {profilData?.id === parseInt(id) && (
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      onClick={() =>
                        handleLogout(value.state.token, value.handleLogin)
                      }
                      className="profil-exit"
                    />
                  )}
                  <div className="profil-follower">
                    <span>{profilData?.total_posts ?? ""} Posts</span>
                    <span>{profilData?.total_followers ?? ""} Followers</span>
                    <span>{profilData?.total_following ?? ""} Following</span>
                  </div>
                  <p>{profilData?.deskripsi ?? ""}</p>
                </div>
              </Card.Body>
              {profilData?.id === parseInt(id) ? <PostInput         /> : ""}
              {profilData ? loadPosts(profilData.posts, value.state.token) : ""}
              <ProfilEdit show={show} handleClose={handleClose} />
            </div>
          </>
        );
      }}
    </ReactContext.Consumer>
  );
};
