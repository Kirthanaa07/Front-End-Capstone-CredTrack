/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Nav, NavDropdown, Navbar, ListGroup, Image,
} from 'react-bootstrap';
import { getAllCredentialsForPhysicianDb } from '../../api/credentialData';
import getAllCredentialTypes from '../../api/credentialTypeData';

export default function ViewCredential() {
  const [credentialDetails, setCredentialDetails] = useState([]);
  const [credImg, setCredentialImg] = useState();
  const [credentialTypes, setCredentialTypes] = useState([]);
  const router = useRouter();
  const { physicianUid } = router.query;

  const getAllCredentialTypesList = () => {
    getAllCredentialTypes().then(setCredentialTypes);
  };

  const getAllPhysicianCredentials = (uid) => {
    getAllCredentialsForPhysicianDb(uid).then(setCredentialDetails);
  };

  const showCredential = (credentialType) => {
    const cred = credentialDetails.find((c) => c.credentialType === credentialType.name);
    if (cred) {
      setCredentialImg(cred.imageUrl);
    }
  };

  useEffect(() => {
    getAllCredentialTypesList();
    getAllPhysicianCredentials(physicianUid);
  }, [physicianUid]);

  return (
    <div className="d-flex flex-row flex-grow-1 m-4">
      <div className="d-flex flex-column flex-grow-1 left-panel">
        <ListGroup>
          {
            credentialTypes.map((credentialType) => (
              <div key={credentialType.credentialTypeId} className="d-flex flex-row align-items-center justify-content-between">
                <ListGroup.Item action onClick={() => showCredential(credentialType)}>
                  <div>{credentialType.name}</div>

                </ListGroup.Item>
                <Navbar className="show-top">
                  <Navbar.Toggle><i className="bi bi-three-dots-vertical" /></Navbar.Toggle>
                  <Navbar.Collapse>
                    <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
                      <NavDropdown title={<i className="bi bi-three-dots-vertical icon-button" />} id="three-dot-nav-dropdown">
                        <NavDropdown.Item href="/credentials/edit/[credentialId].js"><i className="bi bi-pencil-fill pe-3" />
                          Edit
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"><i className="bi bi-trash-fill pe-3" />Delete</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>

            ))
          }
        </ListGroup>
      </div>
      <div className="d-flex flex-column flex-grow-1 right-panel">
        <Image src={credImg} className="cred-image" />
      </div>
    </div>
  );
}
