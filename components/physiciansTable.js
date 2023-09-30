import React from 'react';
import {
  Button,
  Card, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deletePhysicianDb } from '../api/physicianData';
import { useAuth } from '../utils/context/authContext';

function PhysiciansTable({ physicians, onDelete }) {
  const { user } = useAuth();
  const router = useRouter();

  const deleteThisPhysician = (physicianId) => {
    if (window.confirm('Are you sure you want to delete this physician?')) {
      deletePhysicianDb(physicianId).then(() => onDelete());
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
              <Card style={{ width: '18rem', margin: '10px' }}>
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
                          <Button className="edit-btn" href={`/physicians/edit/${physician.uid}`}><i className="bi bi-pencil-fill" />
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
  onDelete: PropTypes.func.isRequired,
};

export default PhysiciansTable;
