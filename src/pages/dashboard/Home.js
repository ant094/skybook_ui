import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ReactContext } from "../../routes";
import { Card } from "react-bootstrap";
import "./home.css";
import post from "./post.jpg";
import ari from "./ari.jpg";
import skydu from "./skydu.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faEllipsisH,
  faLongArrowAltUp,
  faShareAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ProfilEdit } from "./profil-component/ProfilEdit";
import AuthApi from "../../api/auth-login";

export const Home = () => {
  const [show, setShow] = useState(false);

  const handleLogout = async (token, handleLoginContext) => {
    const loginResponse = await AuthApi.logout(token);
    console.log(loginResponse);
    handleLoginContext("");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ReactContext.Consumer>
      {(value) => {
        console.log("ini TOken" + value.state.token);
        if (value.state.token === "") {
          return <Redirect to="/" />;
        }
        return (
          <>
            <div className="navigasi-top">
              <div className="navigasi-top-body">
                <div className="navigasi-top-left">
                  <img
                    src={skydu}
                    alt="Girl in a jacket"
                    className="image-brand"
                  />
                </div>
                <div className="navigasi-top-right">
                  <FontAwesomeIcon icon={faBell} className="navbar-notify" />
                  <img
                    src={ari}
                    alt="Girl in a jacket"
                    className="image-profil"
                  />
                </div>
              </div>
            </div>
            <div className="home mt-3">
              <Card.Body className=" profile">
                <img
                  src={post}
                  alt="Girl in a jacket"
                  className="profil-image"
                />
                <div className="profil-text">
                  <h1>Ari Cahyono</h1>
                  <button onClick={handleShow}>Edit Profil</button>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    onClick={() =>
                      handleLogout(value.state.token, value.handleLogin)
                    }
                    className="profil-exit"
                  />
                  <div className="profil-follower">
                    <span>213 posts</span>
                    <span>23 Followers</span>
                    <span>31 Following</span>
                  </div>
                  <p>Kadang mengganggu jika digigit.</p>
                </div>
              </Card.Body>

              <Card className="mb-2">
                <Card.Body className="text-center">
                  What's on you mind, Paul?
                  <FontAwesomeIcon
                    icon={faLongArrowAltUp}
                    className="post-arrow-up"
                  />
                </Card.Body>
              </Card>

              <Card className="mb-2 pt-2">
                <Card.Header className="card-header-clear-style">
                  <img
                    src={post}
                    alt="Girl in a jacket"
                    className="image-post"
                  />
                  <div className="card-header-title-post">
                    <h1>Ari Cahyono</h1>
                    <h2>June 21, 12:14 pm</h2>
                  </div>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="post-setting"
                  />
                </Card.Header>
                <Card.Body className="pb-1">
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                  <Card.Img
                    src={post}
                    alt="Card image image-post"
                    height="200"
                  />
                </Card.Body>
                <Card.Footer className="card-footer-clear-style">
                  <div className="card-footer-action-icon">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="footer-action-icon"
                    />
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      className="footer-action-icon"
                    />
                    <FontAwesomeIcon
                      icon={faShareAlt}
                      className="footer-action-icon"
                    />
                  </div>
                </Card.Footer>
              </Card>
              <Card className="mb-2 pt-2">
                <Card.Header className="card-header-clear-style">
                  <img
                    src={post}
                    alt="Girl in a jacket"
                    className="image-post"
                  />
                  <div className="card-header-title-post">
                    <h1>Ari Cahyono</h1>
                    <h2>June 21, 12:14 pm</h2>
                  </div>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="post-setting"
                  />
                </Card.Header>
                <Card.Body className="pb-1">
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                  <Card.Img
                    src={post}
                    alt="Card image image-post"
                    height="200"
                  />
                </Card.Body>
                <Card.Footer className="card-footer-clear-style">
                  <div className="card-footer-action-icon">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="footer-action-icon"
                    />
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      className="footer-action-icon"
                    />
                    <FontAwesomeIcon
                      icon={faShareAlt}
                      className="footer-action-icon"
                    />
                  </div>
                </Card.Footer>
              </Card>
              <Card className="mb-2 pt-2">
                <Card.Header className="card-header-clear-style">
                  <img
                    src={post}
                    alt="Girl in a jacket"
                    className="image-post"
                  />
                  <div className="card-header-edit-post-profil">
                    <h1>Ari Cahyono</h1>
                    <h2>June 21, 12:14 pm</h2>
                  </div>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="post-setting"
                  />
                </Card.Header>
                <Card.Body className="pb-1">
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                  <Card.Img
                    src={post}
                    alt="Card image image-post"
                    height="200"
                  />
                </Card.Body>
                <Card.Footer className="card-footer-clear-style">
                  <div className="card-footer-action-icon">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="footer-action-icon"
                    />
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      className="footer-action-icon"
                    />
                    <FontAwesomeIcon
                      icon={faShareAlt}
                      className="footer-action-icon"
                    />
                  </div>
                </Card.Footer>
              </Card>
            </div>
            <ProfilEdit show={show} handleClose={handleClose} />
          </>
        );
      }}
    </ReactContext.Consumer>
  );
};
