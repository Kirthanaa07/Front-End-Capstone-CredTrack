import React from 'react';
import {
  Container, Nav, NavDropdown, Navbar, Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deletePhysicianRequestDb } from '../api/physicianRequestData';

function SubmittedApplicationsTable({ applicationsObj, onDelete }) {
  const { user } = useAuth();
  const deleteThisPhysicianRequest = (physicianRequestId) => {
    if (window.confirm('Are you sure you want to delete this physicianRequest?')) {
      deletePhysicianRequestDb(physicianRequestId).then(() => onDelete());
    }
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
            applicationsObj.map((request) => (
              <tr>
                <td>{request.displayName}</td>
                <td>{request.npiNumber}</td>
                <td>{request.status}</td>
                <td>
                  <Navbar collapseOnSelect expand="lg">
                    <Container>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav"><i className="bi bi-three-dots-vertical" /></Navbar.Toggle>
                      <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
                          <NavDropdown title={<i className="bi bi-three-dots-vertical icon-button" />} id="three-dot-nav-dropdown">
                            <NavDropdown.Item href="/"><i className="bi bi-eye-fill pe-3" />View</NavDropdown.Item>
                            {
                              user.isAdmin ? (
                                <>
                                  <NavDropdown.Item href="#action/3.2"><i className="bi bi-pencil-fill pe-3" />
                                    Edit
                                  </NavDropdown.Item>
                                  <NavDropdown.Item onClick={() => deleteThisPhysicianRequest(request.id)}><i className="bi bi-trash-fill pe-3" />Delete</NavDropdown.Item>

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
  applicationsObj: PropTypes.arrayOf(PropTypes.shape({
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
