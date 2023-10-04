/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ListGroup, Image, Button, Modal,
} from 'react-bootstrap';
import { deleteCredentialDb, getAllCredentialsForPhysicianDb } from '../../api/credentialData';
import getAllCredentialTypes from '../../api/credentialTypeData';
import CredentialForm from '../../components/form/addCredForm';
import { getSinglePhysicianDb } from '../../api/physicianData';

export default function ViewCredential() {
  const [show, setShow] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseImg = () => setShowImg(false);
  const handleShowImg = () => setShowImg(true);
  const [isLoading, setIsLoading] = useState(true);
  const [credentialDetails, setCredentialDetails] = useState([]);
  const [credImg, setCredentialImg] = useState();
  const [selectedCred, setSelectedCred] = useState({});
  const [physician, setPhysician] = useState({});
  const router = useRouter();
  const { physicianUid } = router.query;

  const deleteThisCredential = (credentialDetail) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      deleteCredentialDb(credentialDetail.physicianCredential.credentialId).then(() => router.push('/'));
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

  const handleSubmit = () => {
    handleClose();
    getAllPhysicianCredentials(physicianUid);
  };

  useEffect(() => {
    getSinglePhysicianDb(physicianUid).then(setPhysician);
    getAllPhysicianCredentials(physicianUid);
  }, [physicianUid]);

  if (!isLoading) {
    return (
      <div className="d-flex flex-column flex-grow-1 m-4">
        <h2> {physician.displayName} </h2>
        <div className="d-flex flex-column flex-grow-1">
          <ListGroup className="d-flex gap-3">
            {
              credentialDetails.map((credentialDetail) => (
                <div key={credentialDetail.credentialTypeId} className="d-flex flex-row align-items-center gap-2 justify-content-between">
                  <ListGroup.Item className="d-flex flex-row flex-grow-1 justify-content-between list-item">
                    <div>{credentialDetail.name} {credentialDetail.expirationDate}
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
                    <div className="d-flex flex-row gap-2">
                      {credentialDetail.physicianCredential ? (
                        <>
                          <Button variant="outline-success" className="view-btn" onClick={() => { setCredentialImg(credentialDetail.physicianCredential.imageUrl); handleShowImg(); }}>
                            <i className="bi bi-eye-fill" />
                          </Button>
                          <Button variant="outline-info" className="edit-btn" onClick={() => { setSelectedCred(credentialDetail); handleShow(); }}>
                            <i className="bi bi-pencil-fill" />
                          </Button>
                          <Button variant="outline-danger" className="delete-btn" onClick={() => deleteThisCredential(credentialDetail)}><i className="bi bi-trash-fill" /></Button>
                        </>
                      ) : <>No Credential added</>}
                    </div>
                  </ListGroup.Item>

                </div>
              ))
            }
          </ListGroup>
          <Modal show={showImg} onHide={handleCloseImg}>
            <Modal.Header closeButton>
              <Modal.Title>Credential</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column flex-grow-1">
                <Image src={credImg} className="cred-image" />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseImg}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Credential</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CredentialForm physicianUid={physicianUid} handleSubmit={handleSubmit} credentialObj={selectedCred.physicianCredential} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" form="cred-form">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

      </div>
    );
  }
  return <></>;
}
