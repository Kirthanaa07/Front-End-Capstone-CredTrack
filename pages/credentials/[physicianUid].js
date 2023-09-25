/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Nav, NavDropdown, Navbar, ListGroup, Image,
} from 'react-bootstrap';
import { deleteCredentialDb, getAllCredentialsForPhysicianDb } from '../../api/credentialData';
import getAllCredentialTypes from '../../api/credentialTypeData';

export default function ViewCredential() {
  const [isLoading, setIsLoading] = useState(true);
  const [credentialDetails, setCredentialDetails] = useState([]);
  const [credImg, setCredentialImg] = useState();
  const [credentialTypes, setCredentialTypes] = useState([]);
  const router = useRouter();
  const { physicianUid } = router.query;

  const deleteThisCredential = (credentialType) => {
    const cred = credentialDetails.find((c) => c.credentialType === credentialType.name);
    if (cred) {
      if (window.confirm('Are you sure you want to delete this credential?')) {
        deleteCredentialDb(cred.credentialId).then(() => router.push('/'));
      }
    }
  };

  const getAllCredentialTypesList = () => {
    getAllCredentialTypes().then(setCredentialTypes);
  };

  const getAllPhysicianCredentials = (uid) => {
    getAllCredentialsForPhysicianDb(uid)
      .then(setCredentialDetails)
      .then(setIsLoading(false));
  };

  const showCredential = (credentialType) => {
    const cred = credentialDetails.find((c) => c.credentialType === credentialType.name);
    if (cred) {
      setCredentialImg(cred.imageUrl);
    }
  };

  const editCredential = (credentialType) => {
    const cred = credentialDetails.find((c) => c.credentialType === credentialType.name);
    if (cred) {
      router.push(`/credentials/edit/${cred.credentialId}`);
    }
  };

  useEffect(() => {
    getAllCredentialTypesList();
    getAllPhysicianCredentials(physicianUid);
  }, [physicianUid]);

  if (!isLoading) {
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
                  <Navbar className="show-behind">
                    <Navbar.Collapse>
                      <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
                        <NavDropdown title={<i className="bi bi-three-dots-vertical icon-button" />} className="show-front" id="three-dot-nav-dropdown">
                          <NavDropdown.Item onClick={() => editCredential(credentialType)}><i className="bi bi-pencil-fill pe-3" />
                            Edit
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={() => deleteThisCredential(credentialType)}><i className="bi bi-trash-fill pe-3" />Delete</NavDropdown.Item>
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
  return <></>;
}
