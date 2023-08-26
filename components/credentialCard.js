import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCredential } from '../api/credentialData';

function CredentialCard({ credentialObj, onUpdate }) {
  const deleteThisCredential = () => {
    if (window.confirm(`Delete ${credentialObj.credType}?`)) {
      deleteCredential(credentialObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{credentialObj.credType}</Card.Title>
        <Link href={`/credential/edit/${credentialObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCredential} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

CredentialCard.propTypes = {
  credentialObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    credType: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CredentialCard;
