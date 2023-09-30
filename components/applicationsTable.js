import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deletePhysicianRequestDb, updatePhysicianRequestDb } from '../api/physicianRequestData';
import getPhysicianByNpiNumber from '../api/externalData';
import { createPhysicianDb, updatePhysicianDb } from '../api/physicianData';

function SubmittedApplicationsTable({ applications, onDelete }) {
  const { user } = useAuth();
  const deleteThisPhysicianRequest = (physicianRequestId) => {
    if (window.confirm('Are you sure you want to delete this physicianRequest?')) {
      deletePhysicianRequestDb(physicianRequestId).then(() => onDelete());
    }
  };

  const getPhysicianByNpiAndImport = (request) => {
    getPhysicianByNpiNumber(request.npiNumber).then((data) => {
      if (data) {
        const address = data.addresses.find((a) => a.address_purpose === 'LOCATION');
        const payload = {
          uid: request.uid,
          displayName: request.displayName,
          npiNumber: data.number,
          image: 'https://img.freepik.com/premium-vector/avatar-female-doctor-with-black-hair-doctor-with-stethoscope-vector-illustrationxa_276184-33.jpg?w=826',
          address1: address.address_1,
          address2: address.address_2 ? address.address_2 : '',
          city: address.city,
          state: address.state,
          postalCode: address.postal_code,
          telephoneNumber: data.basic.authorized_official_telephone_number,
        };
        createPhysicianDb(payload).then(({ name }) => {
          const patchPayload = { physicianId: name };
          updatePhysicianDb(patchPayload);
          const statusLoad = {
            physicianRequestId: request.physicianRequestId,
            status: 'Approved',
          };
          updatePhysicianRequestDb(statusLoad);
          alert('Physician Import Successful!');
        });
      } else {
        alert('Invalid NPI number.');
      }
    });
  };

  return (
    <>
      <div className="text-center my-4">
        <h2> Application Info </h2>
        <div className="d-flex flex-wrap">
          {
            applications.map((request) => (
              <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title key={request.physicianRequestId} />
                  <Card.Text className="cell">{request.displayName}</Card.Text>
                  <Card.Text className="cell">{request.npiNumber}</Card.Text>
                  <Card.Text className="cell">{request.status}</Card.Text>
                  <div>
                    {
                      user.isAdmin && request.status === 'Submitted' ? (
                        <>
                          <Button onClick={() => getPhysicianByNpiAndImport(request)}><i className="bi bi-check2-circle pe-3" />Approve and Import</Button>
                          <Button onClick={() => deleteThisPhysicianRequest(request.physicianRequestId)}><i className="bi bi-trash-fill pe-3" />Reject</Button>

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

SubmittedApplicationsTable.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape({
    physicianRequestId: PropTypes.string,
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

export default SubmittedApplicationsTable;
