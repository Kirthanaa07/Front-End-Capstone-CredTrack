import React from 'react';
import {
  Container, Nav, NavDropdown, Navbar, Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deletePhysicianDb } from '../api/physicianData';
import { useAuth } from '../utils/context/authContext';

function PhysiciansTable({ physicians, onDelete }) {
  const { user } = useAuth();
  const deleteThisPhysician = (physicianId) => {
    if (window.confirm('Are you sure you want to delete this physician?')) {
      deletePhysicianDb(physicianId).then(() => onDelete());
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1 gap-3 p-2 b-white">
      <Table className="table">
        <thead>
          <tr>
            <th>Physician Name</th>
            <th>Phone Number</th>
            <th>NPI Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            physicians.map((physician) => (
              <tr key={physician.physicianId}>
                <td className="cell">{physician.displayName}</td>
                <td className="cell">{physician.telephoneNumber}</td>
                <td className="cell">{physician.npiNumber}</td>
                <td className="cell">
                  <Navbar>
                    <Container>
                      <Navbar.Toggle><i className="bi bi-three-dots-vertical" /></Navbar.Toggle>
                      <Navbar.Collapse>
                        <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
                          <NavDropdown title={<i className="bi bi-three-dots-vertical icon-button" />} id="three-dot-nav-dropdown">
                            <NavDropdown.Item href="/"><i className="bi bi-eye-fill pe-3" />View</NavDropdown.Item>
                            {
                              user.isAdmin ? (
                                <>
                                  <NavDropdown.Item href="#action/3.2"><i className="bi bi-pencil-fill pe-3" />
                                    Edit
                                  </NavDropdown.Item>
                                  <NavDropdown.Item onClick={() => deleteThisPhysician(physician.id)}><i className="bi bi-trash-fill pe-3" />Delete</NavDropdown.Item>

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
