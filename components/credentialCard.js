import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCredential } from '../api/credentialData';

function CredentialCard({ credentialObj, onUpdate }) {
  const deleteThisCredential = () => {
    if (window.confirm(`Delete ${credentialObj.first_name}?`)) {
      deleteCredential(credentialObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={credentialObj.image}
        alt={credentialObj.first_name}
        style={{ height: '400px' }}
      />
      <Card.Body>
        <Card.Title>{credentialObj.first_name}</Card.Title>
        <p>{credentialObj.last_name}</p>
        <h4>{credentialObj.npiNumber}NPI No: </h4>
        <Link href={`/team/edit/${credentialObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCredential} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

CredentialCard.propTypes = {
  physicianObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    npiNumber: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CredentialCard;
