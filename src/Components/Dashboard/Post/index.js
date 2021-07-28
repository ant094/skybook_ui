import React, { useEffect, useState } from 'react'
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Card} from 'react-bootstrap';
import CONFIG from '../../../Config';
import DashboardApi from '../../../Api/api-dashboard';
import { Comment } from '../Comment';
import { PostAction } from '../PostAction';
import DOMPurify from 'dompurify';
export const Post = (props) => {
  const [likeStyle, setLikeStyle] = useState("");
  const [totalLike, setTotalLike] = useState("");
  const [totalComment, setTotalComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const token = props.token;
  const [showActionComment, setShowActionComment] = useState(false);
  const [updateDelete, setUpdateDelete] = useState(false);

  const handleLike = async (e, token) => {
    const postId = e.target.id;
    if (likeStyle === "likeStyle") {
      const unlike = await DashboardApi.unlike(postId, token);
      if (unlike === "unliked post success") {
        const total_like = await DashboardApi.totalLike(postId, token);
        setLikeStyle("");
        console.log(total_like);
        setTotalLike(total_like);
      }
    } else {
      const like = await DashboardApi.like(postId, token);
      if (like === "like post success") {
        setLikeStyle("likeStyle");
        const total_like = await DashboardApi.totalLike(postId, token);
        setTotalLike(total_like);
      }
    }
  };

  const isLike = () => {
    const post_id = props?.profilData?.like_posts_id;

    if (post_id?.includes(props.data.id)) {
      setLikeStyle("likeStyle");
    }
  };

  useEffect(() => {
    isLike();
  }, [props.data.id, updateDelete]);

  const loadTotalLike = (likeTotal) => {
    let like = totalLike > 0 ? totalLike : likeTotal;

    if (like > 0) {
      return <div className="total-like-post">{like > 99 ? "99+" : like}</div>;
    } else {
      return <div className="total-like-post"></div>;
    }
  };

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  const loadTotalComment = (commentTotal) => {
    let comment = totalComment > 0 ? totalComment : commentTotal;
    if (comment > 0) {
      return (
        <div className="total-comment-post">
          {comment > 99 ? "99+" : comment}
        </div>
      );
    } else {
      return <div className="total-comment-post"></div>;
    }
  };

  return (
    <div>
      <Card className="mb-2 pt-2">
        <Card.Header className="card-header-clear-style">
          <img
            src={
              props?.data?.user?.profil_picture?.includes("http")
                ? props?.data?.user?.profil_picture
                : `${CONFIG.BASE_URL_API_IMAGE}/${props?.data?.user?.profil_picture}`
            }
            alt="Girl in a jacket"
            className="image-post"
          />
          <div className="card-header-title-post">
            <h1>{props.data.user?.name}</h1>
            <h2>{props.data?.created_at}</h2>
          </div>
          {props.data.user?.id === props.profilData?.user_auth_id && (
            <PostAction
              // setComment={(totalComment) => props.setComment(totalComment)}
              deletePost={() => props.delete()}
              editMode={(id) => props.editMode(id)}
              data={props.data}
              // dataProps={props.data}
              // updateComment={() => setUpdateComment(updateComment ? false : true)}
            />
          )}
        </Card.Header>
        <Card.Body className="pb-1 pt-0">
          <Card.Text>
            <div
              className="preview"
              dangerouslySetInnerHTML={createMarkup(props.data.caption)}
            ></div>
          </Card.Text>
          <Card.Img
            src={`${CONFIG.BASE_URL_API_IMAGE}/${props.data.image}`}
            alt="Card image image-post"
            // height="200"
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

            {loadTotalLike(props.data.total_like)}

            <FontAwesomeIcon
              onClick={() => setShowComment(showComment ? false : true)}
              id={props.data.id}
              icon={faCommentAlt}
              className="footer-action-icon"
            />
            {loadTotalComment(props.data.total_comment)}
            <FontAwesomeIcon icon={faShareAlt} className="footer-action-icon" />
          </div>
        </Card.Footer>

        {showComment && (
          <Comment
            data={props.data}
            setComment={(comment) => setTotalComment(comment)}
            setActionComment={() =>
              setShowActionComment(showActionComment ? false : true)
            }
            actionComment={showActionComment}
          />
        )}
        {/* {showComment && loadComment(props.data)} */}
      </Card>
    </div>
  );
}
