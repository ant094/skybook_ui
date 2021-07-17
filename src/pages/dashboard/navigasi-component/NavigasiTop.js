import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./navigasi-top.css";
import skydu from "./../skydu.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../../../api/auth-login";
import CONFIG from "../../../config/config";
export const NavigasiTop = (props) => {
   const [user, setUser] = useState(null);
     const { id } = useParams();
   let history = useHistory();
   function handleClickProfile() {
     history.push(`/dashboard/profil/${user.id}`);
   }
   function handleClickDashboard() {
     history.push("/dashboard");
   }
    useEffect(() => {
     const getUserData = async () => {
     const user = await AuthApi.user(localStorage.getItem('token'));
     setUser(user);
   }
   getUserData()
    }, [id]);
    console.log(props.total_notification);
  return (
    <>
      <div className="navigasi-top">
        <div className="navigasi-top-body">
          <div className="navigasi-top-left">
            <img
              src={skydu}
              alt="Girl in a jacket"
              className="image-brand"
              onClick={handleClickDashboard}
            />
          </div>
          <div className="navigasi-top-right">
            <FontAwesomeIcon icon={faBell} className="navbar-notify" />
            {props?.data?.total_notification > 0 && (
              <div className="total-notification">
               { props.data.total_notification}
              </div>
            )}

            <img
              src={`${CONFIG.BASE_URL_API_IMAGE}/${props?.data?.profil_picture}`}
              alt="Girl in a jacket"
              className="image-profil"
              onClick={handleClickProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};
