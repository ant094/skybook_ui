import { faEdit, faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import DashboardApi from '../../api/api-dashboard';

export const PostAction = (props) => {
  const [showPostAction, setShowPostAction] = useState(false);
const handleDelete = async (e)=> {
    e.preventDefault();
    console.log(e.target.id);

    const postDelete = await DashboardApi.deletePost(
      props.data?.id,
      localStorage.getItem("token")
    );
    if (postDelete === "delete post success") {
      console.log(postDelete);
      props.deletePost();
      setShowPostAction(false);
    } 
}


const handleEdit = (e)=> {
    e.preventDefault();
    props.editMode(e.target.id);
    setShowPostAction(false);
}

    return (
      <>
        {/* {props.dataProps?.user?.id === props.data?.id && ( */}
        <FontAwesomeIcon
          icon={faEllipsisH}
          className="post-setting"
          onClick={() => setShowPostAction(showPostAction ? false : true)}
        />
        {/* )} */}
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
                  onClick={(e) => handleEdit(e)}
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
                  onClick={(e) => handleDelete(e)}
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
}
