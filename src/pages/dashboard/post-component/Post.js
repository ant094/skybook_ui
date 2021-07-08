import React from 'react'
import "./post.css";
import post from "./../post.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Card } from 'react-bootstrap';

export const Post = (props) => {
  console.log(props.data);
    return (
      <div>
        <Card className="mb-2 pt-2">
          <Card.Header className="card-header-clear-style">
            <img src={post} alt="Girl in a jacket" className="image-post" />
            <div className="card-header-title-post">
              <h1>{props.data.user.name}</h1>
              <h2>June 21, 12:14 pm</h2>
            </div>
            <FontAwesomeIcon icon={faEllipsisH} className="post-setting" />
          </Card.Header>
          <Card.Body className="pb-1">
            <Card.Text>{props.data.caption}</Card.Text>
            <Card.Img src={post} alt="Card image image-post" height="200" />
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
    );
}
