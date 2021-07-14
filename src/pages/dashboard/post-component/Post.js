import React, { useEffect, useState } from 'react'
import "./post.css";
import userDefault from "./../../../images/default-system/user-default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Card } from 'react-bootstrap';
import CONFIG from '../../../config/config';
import DashboardApi from '../../../api/api-dashboard';

export const Post = (props) => {
  const [likeStyle, setLikeStyle] = useState('');
  const token = props.token;

  const handleLike = async (e, token) =>{
    const post_id = e.target.id;
    if(likeStyle === "likeStyle"){
      const unlike = await DashboardApi.unlike(post_id, token);
      if (unlike === "unliked post success") {
          setLikeStyle('');
        }
      }else{
        const like = await DashboardApi.like(post_id, token);
        if (like === "like post success") {
          setLikeStyle('likeStyle');
        }
    }
  }
  const isLike = async (post_id, token) => {
    const like = await DashboardApi.isLikeById(post_id, token);
    console.log('ini like'+like.success);
    if(like.success){
      setLikeStyle('likeStyle');
    }
  };

useEffect(() => {
  async function fetchData() {
    isLike(props.data.id, localStorage.getItem("token"));
  }
  fetchData();
}, [props.data.id]);
    return (
      <div>
        <Card className="mb-2 pt-2">
          <Card.Header className="card-header-clear-style">
            <img
              src={
                props.data.user.profil_picture
                  ? `${CONFIG.BASE_URL_API_IMAGE}/${props.data.user.profil_picture}`
                  : userDefault
              }
              alt="Girl in a jacket"
              className="image-post"
            />
            <div className="card-header-title-post">
              <h1>{props.data.user.name}</h1>
              <h2>June 21, 12:14 pm</h2>
            </div>
            <FontAwesomeIcon icon={faEllipsisH} className="post-setting" />
          </Card.Header>
          <Card.Body className="pb-1">
            <Card.Text>{props.data.caption}</Card.Text>
            <Card.Img
              src={`${CONFIG.BASE_URL_API_IMAGE}/${props.data.image}`}
              alt="Card image image-post"
              height="200"
            />
          </Card.Body>
          <Card.Footer className="card-footer-clear-style">
            <div className="card-footer-action-icon">
              <FontAwesomeIcon
                onClick={(e) => handleLike(e, token)}
                id={props.data.id}
                icon={faThumbsUp}
                className={`footer-action-icon ${likeStyle}`}
              />
              
              <FontAwesomeIcon
                onClick={(e) => handleLike(e)}
                id={props.data.id}
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
    );
}
