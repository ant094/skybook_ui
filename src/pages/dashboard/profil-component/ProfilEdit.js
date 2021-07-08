import React from "react";
import ari from "./../ari.jpg";
// import AuthApi from "../../../api/auth-login";
import "./profil-edit.css";
import FloatingLabel from "react-bootstrap-floating-label";
import { Form, Button, Modal} from "react-bootstrap";

// import ModalHeader from "react-bootstrap/ModalHeader";
export const ProfilEdit = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const hiddenFileInput = React.useRef(null);

  


  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };
  return (
    <>
      <Modal show={props.show} size="sm" onHide={() => props.handleClose()}>
        <Modal.Header closeButton closeLabel={""}>
          <Modal.Title className="card-header-edit-post-profil">
            Ubah Profil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <img
              src={ari}
              alt="Girl in a jacket"
              className="image-profile-edit mb-3"
            />
            <Button onClick={handleClick} className='btn-warning profil-edit-button'>Ubah Foto Profil</Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {/* <input type="file" name="" id=""/> */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="nama lengkap"
                name="name"
                id="name"
                // onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                // onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <FloatingLabel controlId="floatingTextarea2" label="Deskripsi">
              <Form.Control as="textarea" placeholder="Leave a comment here" />
            </FloatingLabel>
            <div className="d-grid gap-2 mb-3 mt-1">
              <Button id="profilEdit" type="submit" size="" >
                Ubah Profil
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
