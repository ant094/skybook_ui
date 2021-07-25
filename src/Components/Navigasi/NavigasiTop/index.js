import React, { useEffect, useState } from "react";
import {  useHistory, useParams } from "react-router-dom";
import "./index.css";
import skydu from "./../../../Assets/Image/skydu.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../../../Api/auth-login";
import CONFIG from "../../../Config";
import { ListGroup } from "react-bootstrap";
import DashboardApi from "../../../Api/api-dashboard";
export const NavigasiTop = (props) => {
   const [user, setUser] = useState(null);
   const [showNotification, setShowNotification] = useState(false);
   const [dataNotification, setDataNotification] = useState(false);
   const [totalNotification, setTotalNotification] = useState(true);
     const { id } = useParams();
   let history = useHistory();
   function handleClickProfile() {
     history.push(`/dashboard/profil/${user?.id}`);
   }
   function handleClickDashboard() {
     history.push("/dashboard");
   }
   
    const getUserData = async () => {
      const user = await AuthApi.user(localStorage.getItem("token"));
      setUser(user);
    };
    if (props.update) {
      getUserData();
    }


                            
    console.log(!showNotification === !totalNotification);
    console.log(props?.data?.total_notification);
    const handleNotification = async () =>{
      const notification = await DashboardApi.getNotification();
      setDataNotification(notification);
      setShowNotification(showNotification ? false : true);
      setTotalNotification(false);
    }
      useEffect(() => {
        getUserData();
       setShowNotification(false);
      }, [id]);

      console.log(user)
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
            <FontAwesomeIcon
              icon={faBell}
              onClick={() => {
                handleNotification();
              }}
              className="navbar-notify"
            />
            {/* {props?.data?.total_notification > 0 && ( */}
            {totalNotification && props.data?.total_notification > 0 && (
              <div className="total-notification">
                {props.data?.total_notification}
              </div>
            )}
            {showNotification && (
              <ListGroup className="notification-result">
                {dataNotification?.map((notification) => {
                  let status = "";
                  switch (notification?.action) {
                    case "like":
                      status = `${notification?.action} your post`;
                      break;
                    case "comment":
                      status = `${notification?.action} on your post`;
                      break;
                    case "follow":
                      status = `${notification?.action} you`;
                      break;
                  }
                  return (
                    <ListGroup.Item>
                      <img
                        src={
                          notification?.user?.profil_picture?.includes("http")
                            ? notification?.user.profil_picture
                            : `${CONFIG.BASE_URL_API_IMAGE}/${notification?.user.profil_picture}`
                        }
                        alt="Girl in a jacket"
                        className="image-profil"
                      />
                      <p>
                        <b>
                          {props.data?.user_auth_id === notification?.user?.id
                            ? "You "
                            : `${notification.user.name} `}
                        </b>
                        {status}
                      </p>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
            <img
              src={
                  user?.profil_picture?.includes("http")
      ? user?.profil_picture
      : `${CONFIG.BASE_URL_API_IMAGE}/${user?.profil_picture}`
              }
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
