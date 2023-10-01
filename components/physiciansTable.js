import React, { useState } from 'react';
import {
  Button,
  Card, Image, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deletePhysicianDb } from '../api/physicianData';
import { useAuth } from '../utils/context/authContext';
import PhysicianForm from './form/addPhysicianForm';

function PhysiciansTable({ physicians, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPhysician, setSelectedPhysician] = useState({});

  const [showPhysicianForm, setShowPhysicianForm] = useState(false);

  const handleClosePhysicianForm = () => setShowPhysicianForm(false);
  const handleShowPhysicianForm = () => setShowPhysicianForm(true);

  const handleSubmitPhysicianForm = () => {
    handleClosePhysicianForm();
    onUpdate();
  };

  const deleteThisPhysician = (physicianId) => {
    if (window.confirm('Are you sure you want to delete this physician?')) {
      deletePhysicianDb(physicianId).then(() => onUpdate());
    }
  };

  const viewPhysician = (physicianUid) => {
    router.push(`/credentials/${physicianUid}`);
  };

  return (
    <>
      <div className="text-center my-4">
        <h2> Physician Profiles </h2>
        <div className="d-flex flex-wrap">
          {
            physicians.map((physician) => (
              <Card style={{ width: '17rem', margin: '10px' }}>
                <Image variant="top" src={physician.image} alt={physician.displayName} thumbnail style={{ height: '400px' }} />
                <Card.Body>
                  <Card.Title>{physician.displayName}</Card.Title>
                  <Card.Text>{physician.telephoneNumber}</Card.Text>
                  <Card.Text>{physician.npiNumber}</Card.Text>
                  <div className="card-btn">
                    <Button className="view-btn" onClick={() => viewPhysician(physician.uid)}> <i className="bi bi-eye-fill" /></Button>
                    {
                      user.isAdmin ? (
                        <>
                          <Button className="edit-btn" onClick={() => { setSelectedPhysician(physician); handleShowPhysicianForm(); }}><i className="bi bi-pencil-fill" />
                          </Button>
                          <Button className="delete-btn" onClick={() => deleteThisPhysician(physician.physicianId)}><i className="bi bi-trash-fill" /></Button>
                        </>
                      ) : <></>
                    }
                  </div>
                </Card.Body>
              </Card>
            ))
          }
        </div>
        <Modal show={showPhysicianForm} onHide={handleClosePhysicianForm} scrollable>
          <Modal.Header closeButton>
            <Modal.Title>Edit Physician</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PhysicianForm handleSubmit={handleSubmitPhysicianForm} physicianObj={selectedPhysician} />
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
    </>
  );
}

// https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
PhysiciansTable.propTypes = {
  physicians: PropTypes.arrayOf(PropTypes.shape({
    physicianId: PropTypes.string,
    uid: PropTypes.string,
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    telephoneNumber: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhysiciansTable;
