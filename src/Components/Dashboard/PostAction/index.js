import {
  faEdit,
  faEllipsisH,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import DashboardApi from "../../../Api/api-dashboard";

export const PostAction = (props) => {

  const [showPostAction, setShowPostAction] = useState(false);
  const token = localStorage.getItem("token");

  const handleDeletePost = async (e, token) => {
    e.preventDefault();
    const postDelete = await DashboardApi.deletePost(
      props.data?.id,
      token
    );
    if (postDelete === "delete post success") {
      props.deletePost();
      setShowPostAction(false);
    }
  };

  const handleEditPost = (e) => {
    e.preventDefault();
    props.editMode(e.target.id);
    setShowPostAction(false);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsisH}
        className="post-setting"
        onClick={() => setShowPostAction(showPostAction ? false : true)}
      />
      <Card
        style={{ width: showPostAction ? "7rem" : "0" }}
        className="post-setting-action"
      >
        {showPostAction && (
          <ListGroup variant="flush">
            <ListGroup.Item className="list-group-comment-action">
              <button
                type="submit"
                id={props.data?.id}
                onClick={(e) => handleEditPost(e)}
                className="button-action-comment"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="list-group-comment-icon-action"
                />

                <p id={props.data?.id}>Ubah Post</p>
              </button>
            </ListGroup.Item>
            <ListGroup.Item className="list-group-comment-action">
              <button
                id={props.data?.id}
                onClick={(e) => handleDeletePost(e, token)}
                type="submit"
                className="button-action-comment"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="list-group-comment-icon-action"
                />
                <p id={props.data?.id}>Hapus Post</p>
              </button>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Card>
    </>
  );
};
