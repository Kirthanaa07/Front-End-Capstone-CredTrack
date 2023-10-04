import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import CredentialForm from './form/addCredForm';
import PhysicianForm from './form/addPhysicianForm';

function PhysicianProfile({ physicianObj, onUpdate }) {
  const [showCredForm, setShowCredForm] = useState(false);
  const [showPhysicianForm, setShowPhysicianForm] = useState(false);

  const handleCloseCredForm = () => setShowCredForm(false);
  const handleShowCredForm = () => setShowCredForm(true);

  const handleClosePhysicianForm = () => setShowPhysicianForm(false);
  const handleShowPhysicianForm = () => setShowPhysicianForm(true);

  const handleSubmitCredForm = () => {
    handleCloseCredForm();
  };

  const handleSubmitPhysicianForm = () => {
    handleClosePhysicianForm();
    onUpdate();
  };

  return (
    <>
      <div className="d-flex flex-column flex-grow-1 gap-3 p-4 b-white profile-text">
        <div className="d-flex flex-row flex-grow-1 p-4 gap-5">
          <Image src={physicianObj.image} alt={physicianObj.displayName} style={{ height: '400px' }} />
          <div className="d-flex flex-column p-4 flex-grow-4">
            <h3>{physicianObj.displayName}</h3>
            <h6>{physicianObj.fieldOfStudy}</h6>
            <h6>{physicianObj.hospitalName}</h6>
            <div>
              <p>Experience : {physicianObj.experience}</p>
              <p>Languages : {physicianObj.languages}</p>
              <p>Specialty : {physicianObj.typeOf}</p>
              <p>Address : {physicianObj.address1} {physicianObj.address2}, {physicianObj.city} {physicianObj.state} {physicianObj.postalCode}</p>
              <Button className="edit-btn" onClick={handleShowPhysicianForm}><i className="bi bi-pencil-fill" />
              </Button>
              <Modal show={showPhysicianForm} onHide={handleClosePhysicianForm} scrollable>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Physician</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <PhysicianForm handleSubmit={handleSubmitPhysicianForm} physicianObj={physicianObj} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClosePhysicianForm}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" form="physician-form">
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
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
          <Modal show={showCredForm} onHide={handleCloseCredForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add Credential</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CredentialForm physicianUid={physicianObj.uid} handleSubmit={handleSubmitCredForm} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCredForm}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="cred-form">
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="flex-grow-0 d-flex justify-content-between">
          <Button variant="primary" onClick={handleShowCredForm}>
            Add Credentials
          </Button>
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
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhysicianProfile;
