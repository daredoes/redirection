import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


const Header = ({ siteTitle }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const aboutBody = (<div>
    <p>This website allows you to store and visit your favorite urls on the internet.</p><p>Each url can be rewritten to something memorable.</p><p>Copy the link address of any of the bookmarks on the site to save their custom url.</p>
    </div>)
  return (
    <Navbar variant="dark" bg="dark">
      <Navbar.Brand as={Link} to="/">{siteTitle}</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={() => setModalShow(true)}>About</Nav.Link>
        <VerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="About"
          body={aboutBody}
        />
      </Nav>
      <Nav>
        <Nav.Link href="/admin">Login</Nav.Link>
      </Nav>
    </Navbar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
