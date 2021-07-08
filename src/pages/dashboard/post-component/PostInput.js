import React from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faLongArrowAltUp  } from "@fortawesome/free-solid-svg-icons";
export const PostInput = () => {
    return (
        <Card className="mb-2">
          <Card.Body className="text-center">
            What's on you mind, Paul?
            <FontAwesomeIcon
              icon={faLongArrowAltUp}
              className="post-arrow-up"
            />
          </Card.Body>
        </Card>
    );
}
