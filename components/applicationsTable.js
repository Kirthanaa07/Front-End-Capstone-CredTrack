import React from 'react';
import {
  Container, Nav, NavDropdown, Navbar, Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deletePhysicianRequestDb } from '../api/physicianRequestData';
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
          alert('Physician Import Successful!');
        });
      } else {
        alert('Invalid NPI number.');
      }
    });
  };

  return (
    <div className="d-flex flex-column flex-grow-1 gap-3 p-2 b-white">
      <Table className="table">
        <thead>
          <tr>
            <th>Physician Name</th>
            <th>NPI Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            applications.map((request) => (
              <tr key={request.physicianRequestId}>
                <td className="cell">{request.displayName}</td>
                <td className="cell">{request.npiNumber}</td>
                <td className="cell">{request.status}</td>
                <td>
                  <Navbar expand="lg">
                    <Container>
                      <Navbar.Toggle><i className="bi bi-three-dots-vertical" /></Navbar.Toggle>
                      <Navbar.Collapse>
                        <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
                          <NavDropdown title={<i className="bi bi-three-dots-vertical icon-button" />} id="three-dot-nav-dropdown">

                            {
                              user.isAdmin && request.status === 'Submitted' ? (
                                <>
                                  <NavDropdown.Item onClick={() => getPhysicianByNpiAndImport(request)}><i className="bi bi-check2-circle pe-3" />Approve and Import</NavDropdown.Item>
                                  <NavDropdown.Item onClick={() => deleteThisPhysicianRequest(request.id)}><i className="bi bi-trash-fill pe-3" />Reject</NavDropdown.Item>

                                </>
                              ) : <></>
                            }
                          </NavDropdown>
                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
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
