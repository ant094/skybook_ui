import React from "react";
import "./index.css";
import FloatingLabel from "react-bootstrap-floating-label";
import { Form, Button, Modal } from "react-bootstrap";
import AuthApi from "../../../Api/auth-login";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CONFIG from "../../../Config";

// import ModalHeader from "react-bootstrap/ModalHeader";
export const ProfilEdit = (props) => {
  const { id } = useParams();
  const [fileInput, setFileInput] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [deskripsi, setDeskripsi] = useState(null);
  const [profilErrorMessage, setProfilErrorMessage] = useState("");
  const [imageUploadReview, setImageUploadReview] = useState(null);
  const hiddenFileInput = React.useRef(null);

  // Main
  const handleEditProfil = async (e, userId, token) => {
    e.preventDefault();
    const data = {
      name: name ?? props.data?.name,
      email: email ?? props.data?.email,
      deskripsi: deskripsi,
    };
    const imageFile = fileInput ?? props.data.profil_picture;
    
    const response = await AuthApi.editProfil(userId, imageFile, data, token);
    if (response?.success === "Updated user success") {
      props.handleClose();
      props.update();
    }
    if (response?.errors) {
      setProfilErrorMessage(response?.errors);
    }
  };

  const handleClickImage = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    setFileInput(file);
    setImageUploadReview(URL.createObjectURL(file));
  };
  const image = props?.data?.profil_picture.includes("http")
    ? props?.data?.profil_picture
    : `${CONFIG.BASE_URL_API_IMAGE}/${props?.data?.profil_picture}`;

  return (
    <>
      <Modal
        show={props.show}
        size="sm"
        onHide={() => {
          props.handleClose();
          setProfilErrorMessage("");
          setImageUploadReview(null);
        }}
      >
        <Modal.Header closeButton closeLabel={""}>
          <Modal.Title className="card-header-edit-post-profil">
            Ubah Profil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleEditProfil(e, id, props.token)}>
            <img
              src={imageUploadReview ?? image}
              alt="Girl in a jacket"
              className="image-profile-edit mb-3"
            />
            <Button
              onClick={handleClickImage}
              className="btn-warning profil-edit-button"
            >
              Ubah Foto Profil
            </Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChangeImage}
              style={{ display: "none" }}
            />
            <Form.Group className="mb-3">
              <Form.Text className="text-danger"></Form.Text>
              <Form.Control
                type="text"
                value={name ?? props.data?.name}
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-danger">
                {profilErrorMessage?.name !== "undefined" ? profilErrorMessage?.name : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={email ?? props.data?.email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-danger">
                {profilErrorMessage?.email !== "undefined"
                  ? profilErrorMessage?.email
                  : ""}
              </Form.Text>
            </Form.Group>
            <FloatingLabel
              controlId="floatingTextarea2"
              onChange={(e) => setDeskripsi(e.target.value)}
              value={deskripsi ? "" : props.data?.deskripsi}
              label="Deskripsi"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                rows="3"
              />
            </FloatingLabel>
            <div className="d-grid gap-2 mb-3 mt-1">
              <Button id="profilEdit" type="submit" size="">
                Ubah Profil
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
