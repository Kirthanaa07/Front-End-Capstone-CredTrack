// import React from 'react';
// import PropTypes from 'prop-types';
// import Card from 'react-bootstrap/Card';
// import {
//   Container, Nav, NavDropdown, Navbar,
// } from 'react-bootstrap';
// import { deleteCredentialDb } from '../api/credentialData';

// function CredentialCard({ credentialObj, onUpdate }) {
//   const deleteThisCredential = () => {
//     if (window.confirm(`Delete ${credentialObj.credentialType}?`)) {
//       deleteCredentialDb(credentialObj.credentialId).then(() => onUpdate());
//     }
//   };
//   return (
//     <Card style={{ width: '18rem', margin: '10px' }}>
//       <Card.Img
//         variant="top"
//         src={credentialObj.imageUrl}
//         alt={credentialObj.credentialType}
//         style={{ height: '400px' }}
//       />
//       <Card.Body>
//         <Card.Title>{credentialObj.credentialType}</Card.Title>
//         <Navbar>
//           <Container>
//             <Navbar.Toggle><i className="bi bi-three-dots-vertical" /></Navbar.Toggle>
//             <Navbar.Collapse>
//               <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
//                 <NavDropdown title={<i className="bi bi-three-dots-vertical icon-button" />} id="three-dot-nav-dropdown">
//                   <NavDropdown.Item href="/"><i className="bi bi-eye-fill pe-3" />View</NavDropdown.Item>
//                   <NavDropdown.Item href={`/credentials/edit/${credentialObj.credentialId}`} passHref><i className="bi bi-pencil-fill pe-3" />
//                     Edit
//                   </NavDropdown.Item>
//                   <NavDropdown.Item onClick={() => deleteThisCredential(credentialObj.credentialId)}><i className="bi bi-trash-fill pe-3" />Delete</NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </Card.Body>
//     </Card>
//   );
// }

// CredentialCard.propTypes = {
//   credentialObj: PropTypes.shape({
//     credentialId: PropTypes.string,
//     imageUrl: PropTypes.string,
//     credentialType: PropTypes.string,
//     expirationDate: PropTypes.string,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default CredentialCard;
