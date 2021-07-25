import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Modal } from "react-bootstrap";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import { useDropzone } from "react-dropzone";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DashboardApi from "../../../Api/api-dashboard";
import CONFIG from "../../../Config";
export const PostInput = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [show, setShow] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [toolbarHidden, setToolbarHidden] = useState(true);
  const [postErrorMessage, setPostErrorMessage] = useState("");
  const [modeEdit, setModeEdit] = useState(true);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const files = acceptedFiles.map((file) => (
    <img
      src={URL.createObjectURL(file)}
      alt="Girl in a jacket"
      className="post-image"
    />
  ));
  const filesEdit = () => {
    if (acceptedFiles.length === 0) {
      return (
        <img
          src={`${CONFIG.BASE_URL_API_IMAGE}/${imageEdit}`}
          alt="Girl in a jacket"
          className="post-image"
        />
      );
    }

    return acceptedFiles.map((file) => (
      <img
        src={URL.createObjectURL(file)}
        alt="Girl in a jacket"
        className="post-image"
      />
    ));
  };

  const getEditvalue = async (id) => {
    const response = await DashboardApi.postShowEdit(id);
    const blocksFromHTML = convertFromHTML(response.caption);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    await setEditorState(EditorState.createWithContent(await state));
    await convertContentToHTML();
    await setImageEdit(response.image);
  };

  const handleClose = () => {
    setShow(false);
    setToolbarHidden(true);
    setFileInput("");
    setPostErrorMessage("");
    props.closeEditMode();
    setEditorState(EditorState.createEmpty());
  };

  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setToolbarHidden(false);
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  if (props.editMode && modeEdit) {
    getEditvalue(props.editModeId);
    convertContentToHTML();
    setModeEdit(false);
  }
  const inputPost = async () => {
    const responseInputPost = await DashboardApi.inputPost(
      convertedContent,
      fileInput
    );
    if (responseInputPost.success === "Post upload success") {
      props.updateInputPost();
      handleClose();
    }
    setPostErrorMessage(responseInputPost.errors);
  };

  const editPost = async () => {
    const responseEditPost = await DashboardApi.postEdit(
      props.editModeId,
      convertedContent,
      fileInput
    );
    if (responseEditPost === "update post success") {
      props.updateInputPost();
      handleClose();
    }
  };
  const handleSumbitPost = async () => {
    if (props.editMode) {
      editPost();
    } else {
      inputPost();
    }
  };

  const handleShow = () => setShow(true);
  return (
    <>
      <Card className="mb-2" onClick={handleShow}>
        <Card.Body className="text-center">
          What's on you mind, {props.data?.name.split(" ")[0]}?
          <FontAwesomeIcon icon={faLongArrowAltUp} className="post-arrow-up" />
        </Card.Body>
      </Card>

      <Modal
        show={props.editMode ? props.editMode : show}
        size="md"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.editMode ? "Edit Post" : "Buat Post Baru"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Editor
            placeholder={`Apa Yang Ada Dalam Pikiranmu! ${
              props.data?.name.split(" ")[0]
            }`}
            // editorState={'caption'}
            editorState={editorState}
            toolbarHidden={toolbarHidden}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={handleEditorChange}
          />
          {postErrorMessage?.caption !== "undefined" && (
            <p className="text-danger">{postErrorMessage?.caption}</p>
          )}
          <section className="container">
            <div
              {...getRootProps({
                className: "dropzone",
              })}
            >
              <input
                {...getInputProps({
                  onChange: (event) => {
                    setPostErrorMessage("");
                    setFileInput(event.target.files[0]);
                  },
                })}
              />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {postErrorMessage?.image !== "undefined" && (
              <p className="text-danger">{postErrorMessage?.image}</p>
            )}
            <aside>
              {fileInput !== "" && <h4>Image Upload</h4>}
              {fileInput !== "" && files}
              {props.editMode && <h4>Image Upload</h4>}
              {props.editMode && filesEdit()}
            </aside>
          </section>
          <Button
            id="buttonPost"
            className="pt-1 pb-1"
            type="submit"
            size=""
            onClick={() => handleSumbitPost()}
          >
            Post
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
