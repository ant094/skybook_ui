import { faEdit, faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import DashboardApi from '../../../Api/api-dashboard';

export const CommentAction = (props) => {
  const [showComment, setShowComment] = useState(false);
const handleDelete = async (e)=> {
    e.preventDefault();
    const dataComment = await DashboardApi.deleteComment(
      props.data?.pivot.comment_id,
      localStorage.getItem("token")
    );
    if (dataComment === "delete post comment success"){
         const totalComment = await DashboardApi.loadCommentByPostId(
           props.data?.id,
           localStorage.getItem("token")
         );
        props.setComment(totalComment);
        
        setShowComment(false);
        props.updateComment();
    } 
}
const handleEdit = (e)=> {
    e.preventDefault();
    console.log(e.target.id);
    props.setEditComment(e.target.id);
}

    return (
      <>
        {props.dataProps?.user?.id === props.data?.id && (
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="comment-setting"
            onClick={() => setShowComment(showComment ? false : true)}
          />
        )}
        <Card
          style={{ width: showComment ? "7rem" : "0" }}
          className="comment-setting-action"
        >
          {showComment && (
            <ListGroup variant="flush">
              <ListGroup.Item
                id={props.data?.pivot.comment_id}
                className="list-group-comment-action"
              >
                <button
                  type="submit"
                  id={props.data?.pivot.comment_id}
                  onClick={(e) => handleEdit(e)}
                  className="button-action-comment"
                >
                  <FontAwesomeIcon
                    // onClick={(e) => handleLike(e, token)}

                    icon={faEdit}
                    className="list-group-comment-icon-action"
                  />
                  <p id={props.data?.pivot.comment_id}>Ubah komentar</p>
                </button>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-comment-action">
                <button
                  type="submit"
                  id={props.data?.pivot.comment_id}
                  onClick={(e) => handleDelete(e)}
                  className="button-action-comment"
                >
                  <FontAwesomeIcon
                    // onClick={(e) => handleLike(e, token)}
                    icon={faTrash}
                    className="list-group-comment-icon-action"
                  />
                  <p id={props.data?.pivot.comment_id}>Hapus komentar</p>
                </button>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card>
      </>
    );
}
