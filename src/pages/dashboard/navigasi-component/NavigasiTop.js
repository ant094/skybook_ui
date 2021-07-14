import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./navigasi-top.css";
import skydu from "./../skydu.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
export const NavigasiTop = (props) => {
   let history = useHistory();
   function handleClickProfile() {
     history.push("/dashboard/profil/1");
   }
   function handleClickDashboard() {
     history.push("/dashboard");
   }
  return (
    <>
      <div className="navigasi-top">
        <div className="navigasi-top-body">
          <div className="navigasi-top-left">
            <img src={skydu} alt="Girl in a jacket" className="image-brand" onClick={handleClickDashboard} />
          </div>
          <div className="navigasi-top-right">
            <FontAwesomeIcon icon={faBell} className="navbar-notify" />
            <img src={props.imageUser} alt="Girl in a jacket" className="image-profil" onClick={handleClickProfile}/>
          </div>
        </div>
      </div>
    </>
  );
};
