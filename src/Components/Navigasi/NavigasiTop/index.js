import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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

  const handleNotification = async () => {
    const notification = await DashboardApi.getNotification();
    setDataNotification(notification);
    setShowNotification(showNotification ? false : true);
    setTotalNotification(false);
  };

  const helperNotification = (notificationAction) => {
    let status  = '';
     switch (notificationAction) {
       case "like":
         status = `${notificationAction} your post`;
         break;
       case "comment":
         status = `${notificationAction} on your post`;
         break;
       case "follow":
         status = `${notificationAction} you`;
         break;
       default:
         status = `not found`;
         break;
     }
     return status;
  }

  useEffect(() => {
    getUserData();
    setShowNotification(false);
  }, [id]);

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
            {totalNotification && props.data?.total_notification > 0 && (
              <div className="total-notification">
                {props.data?.total_notification}
              </div>
            )}
            {showNotification && (
              <ListGroup className="notification-result">
                {dataNotification?.map((notification) => {
                  const status = helperNotification(notification?.action);
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
                        <b>{` ${notification.time}`}</b>
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
