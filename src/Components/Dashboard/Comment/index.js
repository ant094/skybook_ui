import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { Card, Form } from "react-bootstrap";
import Picker from "emoji-picker-react";
import DashboardApi from "../../../Api/api-dashboard";
import CONFIG from "../../../Config";
import { CommentAction } from "./../CommentAction";
export const Comment = (props) => {
  const [commentText, setCommentText] = useState("");
  const [commentEditText, setCommentEditText] = useState("");
  const [comment, setComment] = useState(null);
  const [commentLength, setCommentLength] = useState(1);
  const [selectEmoji, setSelectEmoji] = useState(false);
  const [selectEmojiEdit, setSelectEmojiEdit] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [editComment, setEditComment] = useState(0);
  const [emojiClickStyle, setEmojiClickStyle] = useState({
    verticalAlign: "middle",
  });

  const handleEnterComment = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const postId = e.target.id;
      const commentPost = await DashboardApi.inputComment(
        postId,
        commentText,
        localStorage.getItem("token")
      );
      if (commentPost === "Comment Post success insert in db") {
        loadComment(postId);
        const total_comment = await DashboardApi.totalComment(
          postId,
          localStorage.getItem("token")
        );
        props.setComment(total_comment);
        setCommentText("");
      }
    }
  };
  const handleComment = (event) => {
    setCommentText(event.target.value);
    let c =
      Math.floor(commentText.length / 44) === 0
        ? 1
        : Math.ceil(commentText.length / 44);
    setCommentLength(c);
    setEmojiClickStyle(
      c > 1
        ? { verticalAlign: "bottom", marginBottom: "8px" }
        : { verticalAlign: "middle" }
    );
  };
  const onEmojiClick = (event, emojiObject) => {
    setSelectEmoji(false);
    setCommentText(commentText + emojiObject.emoji);
  };

  const handleEnterEditComment = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const commentId = e.target.id;
      const commentPost = await DashboardApi.editComment(
        commentId,
        commentEditText
      );
      if (commentPost === "Update post comment success") {
        setEditComment(0);
      }
    }
  };
  const handleEditComment = (event) => {
    setCommentEditText(event.target.value);
    let c =
      Math.floor(commentEditText.length / 44) === 0
        ? 1
        : Math.ceil(commentEditText.length / 44);
    setCommentLength(c);
    setEmojiClickStyle(
      c > 1
        ? { verticalAlign: "bottom", marginBottom: "8px" }
        : { verticalAlign: "middle" }
    );
  };
  const onEmojiEditClick = (event, emojiObject) => {
    setSelectEmojiEdit(false);
    setCommentEditText(commentEditText + emojiObject.emoji);
  };

  const loadComment = async (postId) => {
    const dataComment = await DashboardApi.loadCommentByPostId(
      postId,
      localStorage.getItem("token")
    );
    setComment(dataComment);
    return dataComment;
  };

  useEffect(() => {
    loadComment(props.data.id);
  }, [props.data.id, updateComment, editComment]);

  const viewComment = (data) => {
    return data?.map((data) => {
      return (
        <>
          {data?.pivot?.comment_id != editComment ? (
            <Form className="pl-3 pr-3">
              <div className="comment">
                <img
                  src={
                    data?.profil_picture.includes("http")
                      ? data.profil_picture
                      : `${CONFIG.BASE_URL_API_IMAGE}/${data.profil_picture}`
                  }
                  alt="Girl in a jacket"
                  className="comment-img"
                />
                <Card className="card-load-comment">
                  <h1>{data?.name}</h1>
                  <p>{data?.pivot?.comment}</p>
                </Card>
                <CommentAction
                  setComment={(totalComment) => props.setComment(totalComment)}
                  setEditComment={setEditComment.bind(setEditComment)}
                  editComment={editComment}
                  data={data}
                  updateComment={() =>
                    setUpdateComment(updateComment ? false : true)
                  }
                />
              </div>
            </Form>
          ) : (
            <Form className="pl-3 pr-3">
              <div className="comment">
                <img
                  src={
                    data?.profil_picture.includes("http")
                      ? data.profil_picture
                      : `${CONFIG.BASE_URL_API_IMAGE}/${data.profil_picture}`
                  }
                  alt="Girl in a jacket"
                  className="comment-img"
                />
                <Form.Control
                  placeholder="Tulis komentar kamu"
                  className="comment-text"
                  value={
                    commentEditText !== ""
                      ? commentEditText
                      : data?.pivot?.comment
                  }
                  as="textarea"
                  id={editComment}
                  rows={commentLength}
                  onKeyPress={(e) => handleEnterEditComment(e)}
                  onChange={handleEditComment}
                />

                <FontAwesomeIcon
                  icon={faSmile}
                  className="comment-icon"
                  style={emojiClickStyle}
                  onClick={() => {
                    setCommentEditText(data?.pivot?.comment);
                    setSelectEmojiEdit(selectEmojiEdit ? false : true);
                  }}
                />
                <Form.Text className="comment-text-muted">
                  Tekan Enter untuk mengirim
                </Form.Text>
                {selectEmojiEdit && (
                  <Picker
                    onEmojiClick={onEmojiEditClick}
                    id={data?.pivot?.comment}
                    disableSkinTonePicker
                    disableSearchBar="true"
                  />
                )}
              </div>
            </Form>
          )}
        </>
      );
    });
  };

  return (
    <div>
      {viewComment(comment)}
      <Form className="pl-3 pr-3">
        <div className="comment">
          <img
            src={
              props.data?.user?.profil_picture?.includes("http")
                ? props.data?.user?.profil_picture
                : `${CONFIG.BASE_URL_API_IMAGE}/${props.data?.user?.profil_picture}`
            }
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
            onKeyPress={(e) => handleEnterComment(e)}
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
    </div>
  );
};
