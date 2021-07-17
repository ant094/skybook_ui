import React, { useEffect, useState } from 'react'
import "./post.css";
import userDefault from "./../../../images/default-system/user-default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faShareAlt, faSmile, faSmileBeam, faSmileWink } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Card, Form } from 'react-bootstrap';
import CONFIG from '../../../config/config';
import DashboardApi from '../../../api/api-dashboard';
import Picker from "emoji-picker-react";
export const Post = (props) => {
  const [likeStyle, setLikeStyle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentLength, setCommentLength] = useState(1);
  const [emojiClickStyle, setEmojiClickStyle] = useState({ verticalAlign: 'middle'});
  const token = props.token;

  const handleLike = async (e, token) =>{
    const postId = e.target.id;
    if(likeStyle === "likeStyle"){
      const total_like = await DashboardApi.totalLike(postId, token);
      const unlike = await DashboardApi.unlike(postId, token);
      if (unlike === "unliked post success") {
        setLikeStyle('');
        // props.like(total_like);

        }
    }else{
      const total_like = await DashboardApi.totalLike(postId, token);
      const like = await DashboardApi.like(postId,  token);
      if (like === "like post success") {
          setLikeStyle('likeStyle');
          // props.like(total_like);
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
const [selectEmoji, setSelectEmoji] = useState(false);
const handleComment = (event)=>{
setCommentText(event.target.value);
let c = Math.floor(commentText.length / 44) === 0 ?  1 : Math.ceil(commentText.length / 44);
   setCommentLength(c);
   setEmojiClickStyle(c > 1 ? { verticalAlign: 'bottom', marginBottom: '8px'} : { verticalAlign: 'middle'} )
}
const onEmojiClick = (event, emojiObject) => {
  setSelectEmoji(false);
  setCommentText(commentText + emojiObject.emoji);
};

const handleEnter = async (e, token) =>{
   if(e.key === 'Enter'){
     e.preventDefault();
     const postId  = e.target.id;
     const commentPost = await DashboardApi.inputComment(postId, commentText,token);
     console.log(postId);
     console.log(commentText);
     if (commentPost === "Comment Post success insert in db") {
       console.log(commentPost); 
     } 
   }
}
useEffect(() => {
  
    const loadIsLike = async (post_id, token) => await isLike(post_id, token);
    loadIsLike(props.data.id, localStorage.getItem("token"));
}, [props.data.id]);

    return (
      <div>
        <Card className="mb-2 pt-2">
          <Card.Header className="card-header-clear-style">
            <img
              src={
                props.data.user?.profil_picture
                  ? `${CONFIG.BASE_URL_API_IMAGE}/${props.data.user.profil_picture}`
                  : userDefault
              }
              alt="Girl in a jacket"
              className="image-post"
            />
            <div className="card-header-title-post">
              <h1>{props.data.user?.name}</h1>
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
              {props.data.total_like > 0 && (
                <div className="total-like-post">{props.data.total_like}</div>
              )}

              <FontAwesomeIcon
                onClick={(e) => handleLike(e)}
                id={props.data.user.id}
                icon={faCommentAlt}
                className="footer-action-icon"
              />
              <FontAwesomeIcon
                icon={faShareAlt}
                className="footer-action-icon"
              />
            </div>
          </Card.Footer>
          <Form className="pl-3 pr-3">
            <div className="comment">
              <img
                src={userDefault}
                alt="Girl in a jacket"
                className="comment-img"
              />
              <Card className="card-load-comment">
                <h1>Ari Cahyono</h1>
                <p>
                  dawdada loredawmdawiod dawdada loredawmdawiod dawdada
                  loredawmdawiod dawdada loredawmdawiod dawdada loredawmdawiod
                </p>
              </Card>
            </div>
          </Form>
          <Form className="pl-3 pr-3">
            <div className="comment">
              <img
                src={userDefault}
                alt="Girl in a jacket"
                className="comment-img"
              />
              <Form.Control
                placeholder="Tulis komentar kamu"
                className="comment-text"
                value={commentText}
                as="textarea"
                id={props.data.id}
                rows={commentLength}
                onKeyPress={(e) => handleEnter(e, token)}
                onChange={handleComment}
              />

              <FontAwesomeIcon
                icon={faSmile}
                className="comment-icon"
                style={emojiClickStyle}
                onClick={() => setSelectEmoji(selectEmoji ? false : true)}
              />
              <Form.Text className="comment-text-muted">
                Tekan Enter untuk mengirim
              </Form.Text>
              {selectEmoji && (
                <Picker
                  onEmojiClick={onEmojiClick}
                  disableSkinTonePicker
                  disableSearchBar="true"
                />
              )}
            </div>
          </Form>
        </Card>
      </div>
    );
}
