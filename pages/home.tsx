import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

// css
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import { Button, Container, Form, Modal } from "react-bootstrap";

function Home() {
  const router = useRouter();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container fluid className="content">
      <Head>
        <title>Home</title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>
            <FontAwesomeIcon icon={IconSolid.faDashboard} /> Dashboard{" "}
          </h1>
          <hr />
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Container>
  );
}
Home.auth = true;

export default Home;
