import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { ReactContext } from "../../../routes";
import { Card } from "react-bootstrap";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { ProfilEdit } from "../../../Components/Auth/ProfilEdit";
import AuthApi from "../../../Api/auth-login";
import { NavigasiTop } from "../../../Components/Navigasi/NavigasiTop";
import { Post } from "../../../Components/Dashboard/Post";
import { PostInput } from "../../../Components/Dashboard/PostInput";
import DashboardApi from "../../../Api/api-dashboard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CONFIG from "../../../Config";

export const Profil = () => {
  
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [profilData, setProfilData] = useState(null);
  const [emailVerify, setEmailVerify] = useState(false);
  const [follower, setFollower] = useState(false);
  const [profilUpdate, setProfilUpdate] = useState(false);
  const [postUpdate, setPostUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeId, setEditModeId] = useState(false);
  const [login, setLogin] = useState(true);
  const token = localStorage.getItem("token");
  const [like, setLike] = useState(0);

  const handlePostDelete = () => {
    setPostUpdate(postUpdate ? false : true);
  };

  const handleLogout = async (token) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AuthApi.logout(token);
        setLogin(false);
        localStorage.clear();
      }
    });
  };

  const getProfilData = async (id, token) =>
    await DashboardApi.getDataProfilById(id, token);
  const isFollower = async (user_follower_id, token) => {
    const follower = await DashboardApi.isFollowerById(user_follower_id, token);
    return setFollower(follower.success);
  };
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function fetchData() {
      let data = await getProfilData(id, localStorage.getItem("token"));
      isFollower(id, localStorage.getItem("token"));

      if (data.message === "Your email address is not verified.") {
        setEmailVerify(true);
      }
      return setProfilData(data.success);
    }
    fetchData();
    setProfilUpdate(false);
  }, [id, like, profilUpdate, postUpdate, follower]);

  // Follow And Unfollow
  const handleFollow = async (e, token) => {
    const userFollowerId = e.target.value;
    const followCheck = await DashboardApi.postFollow(userFollowerId, token);
    if (followCheck === "follow success") {
      setFollower(true);
    }
  };
  const handleUnfollow = async (e, token) => {
    const userFollowerId = e.target.value;
    const followCheck = await DashboardApi.deleteUnfollow(
      userFollowerId,
      token
    );
    if (followCheck === "unfollow success") {
      setFollower(false);
    }
  };

  const handleEditMode = (id) => {
    setEditMode(true);
    setEditModeId(id);
  };

  const toggleModalEditProfil = () => setShow(show ? false : true);

  const loadPosts = (data, token) => {
    return data?.map((data) => (
      <Post
        delete={handlePostDelete.bind(handlePostDelete)}
        key={data.id}
        token={token}
        data={data}
        editMode={handleEditMode.bind(handleEditMode)}
        profilData={profilData}
        like={(data) => {
          setLike(data);
        }}
      />
    ));
  };
  if (emailVerify) {
    MySwal.fire({
      title: <p>Mohon Verifikasi Email Terlebih Dahulu!</p>,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: "warning",
    });
  }

  const viewBtnFollow = (isFollower, token) => {
    if (isFollower) {
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
    } else {
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
  };

  return (
    <>
      {(!token || !login) && <Redirect to="/" />}
      <NavigasiTop data={profilData} update={profilUpdate} />
      <div id="main">
        {profilData && (
          <Card.Body className="profile">
            <img
              src={
                profilData?.profil_picture?.includes("http")
                  ? profilData?.profil_picture
                  : `${CONFIG.BASE_URL_API_IMAGE}/${profilData?.profil_picture}`
              }
              alt="Girl in a jacket"
              className="profil-image"
            />
            <div className="profil-text">
              <h1>{profilData?.name ?? ""}</h1>
              {profilData?.user_auth_id == id && (
                <button onClick={toggleModalEditProfil}>Edit Profil</button>
              )}
              {profilData?.user_auth_id != id && viewBtnFollow(follower, token)}

              {profilData?.user_auth_id == id && (
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  onClick={() => handleLogout(token)}
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
        )}
        {profilData?.user_auth_id == id && (
          <PostInput
            data={profilData}
            editMode={editMode}
            closeEditMode={() => setEditMode(false)}
            editModeId={editModeId}
            updateInputPost={() => setPostUpdate(postUpdate ? false : true)}
          />
        )}
        {profilData ? loadPosts(profilData.posts, token) : ""}
        <ProfilEdit
          show={show}
          handleClose={toggleModalEditProfil}
          data={profilData}
          token={token}
          update={() => setProfilUpdate(true)}
        />
        {profilData?.posts?.length === 0 && (
          <Card body className="post-empty">
            belum ada post yang di buat
          </Card>
        )}
      </div>
    </>
  );
};
