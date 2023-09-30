/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Nav, Navbar, ListGroup, Image, Button, Modal,
} from 'react-bootstrap';
import { deleteCredentialDb, getAllCredentialsForPhysicianDb } from '../../api/credentialData';
import getAllCredentialTypes from '../../api/credentialTypeData';
import EditCredential from './edit/[credentialId]';

export default function ViewCredential() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(true);
  const [credentialDetails, setCredentialDetails] = useState([]);
  const [credImg, setCredentialImg] = useState();
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

  const getAllPhysicianCredentials = (uid) => {
    getAllCredentialsForPhysicianDb(uid).then((creds) => {
      getAllCredentialTypes().then((credTypes) => {
        const expandedCt = credTypes.map((ct) => {
          const pc = creds.find((c) => c.credentialType === ct.name);
          return {
            ...ct, physicianCredential: pc,
          };
        });
        setCredentialDetails(expandedCt);
      });
    })
      .then(setIsLoading(false));
  };

  const showCredential = (credentialType) => {
    const cred = credentialDetails.find((c) => c.credentialType === credentialType.name);
    if (cred) {
      setCredentialImg(cred.imageUrl);
    }
  };

  // const editCredential = (credentialType) => {
  //   const cred = credentialDetails.find((c) => c.credentialType === credentialType.name);
  //   if (cred) {
  //     router.push(`/credentials/edit/${cred.credentialId}`);
  //   }
  // };

  useEffect(() => {
    getAllPhysicianCredentials(physicianUid);
  }, [physicianUid]);

  if (!isLoading) {
    return (
      <div className="d-flex flex-row flex-grow-1 m-4">
        <div className="d-flex flex-column flex-grow-1 left-panel">
          <ListGroup>
            {
              credentialDetails.map((credentialDetail) => (
                <div key={credentialDetail.credentialTypeId} className="d-flex flex-row align-items-center justify-content-between">
                  <ListGroup.Item action onClick={() => showCredential(credentialDetail)}>
                    <div>{credentialDetail.name}
                      {credentialDetail.physicianCredential?.approvalStatus === 'Approved' ? (
                        <div className="approve">
                          <i className="bi bi-check-square approved" />
                        </div>
                      ) : <></>}
                      {credentialDetail.physicianCredential?.approvalStatus === 'Rejected' ? (
                        <div className="rejected">
                          <i className="bi bi-x-square reject" />
                        </div>
                      ) : <></>}
                    </div>
                  </ListGroup.Item>
                  <Navbar className="show-behind">
                    <Navbar.Collapse>
                      <Nav className="me-auto d-flex flex-grow-1 justify-content-between">
                        <Button variant="outline-info" onClick={handleShow}>
                          Edit
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <EditCredential />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Button variant="outline-danger" onClick={() => deleteThisCredential(credentialDetail)}>Delete</Button>
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
