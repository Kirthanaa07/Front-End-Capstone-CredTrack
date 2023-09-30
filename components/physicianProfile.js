import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import CredentialForm from './form/addCredForm';

function PhysicianProfile({ physicianObj }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <div className="d-flex flex-column flex-grow-1 gap-3 p-4 b-white profile-text">
        <div className="d-flex flex-row flex-grow-1 p-4 gap-5">
          <Image src={physicianObj.image} alt={physicianObj.displayName} roundedCircle style={{ height: '400px' }} />
          <div className="d-flex flex-column p-4 flex-grow-4">
            <h3>{physicianObj.displayName}{physicianObj.lastName}</h3>
            <h6>{physicianObj.fieldOfStudy}</h6>
            <h6>{physicianObj.hospitalName}</h6>
            <div>
              <p>Experience : {physicianObj.experience}</p>
              <p>Languages : {physicianObj.languages}</p>
              <p>Typeof : {physicianObj.typeOf}</p>
              <Button className="edit-btn" href={`/physicians/edit/${physicianObj.uid}`}><i className="bi bi-pencil-fill" />
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-grow-3">
          <h4>About</h4>
          <h5>{physicianObj.description}</h5>
        </div>
        <div className="contact-info justify-content-center gap-3">
          <h6><i className="bi bi-telephone-fill" /> {physicianObj.telephoneNumber}</h6>
          <h6><i className="bi bi-envelope-fill" /> {physicianObj.email}</h6>
        </div>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Add Credentials
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Credential</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CredentialForm handleSubmit={handleSubmit} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="cred-form">
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="flex-grow-0 d-flex justify-content-end">
          <Link href={`/credentials/${physicianObj.uid}`} passHref>
            <Button variant="success" className="m-2">VIEW CREDENTIALS</Button>
          </Link>
        </div>
      </div>

    </>
  );
}

PhysicianProfile.propTypes = {
  physicianObj: PropTypes.shape({
    physicianId: PropTypes.string,
    uid: PropTypes.string,
    image: PropTypes.string,
    displayName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    telephoneNumber: PropTypes.string,
    email: PropTypes.string,
    fieldOfStudy: PropTypes.string,
    hospitalName: PropTypes.string,
    experience: PropTypes.string,
    languages: PropTypes.string,
    typeOf: PropTypes.string,
  }).isRequired,
};

export default PhysicianProfile;
