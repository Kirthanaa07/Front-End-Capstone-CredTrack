import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteCredential } from '../api/credentialData';

function CredentialCard({ credentialObj, onUpdate }) {
  const deleteThisCredential = () => {
    if (window.confirm(`Delete ${credentialObj.credentialType}?`)) {
      deleteCredential(credentialObj.credentialId).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={credentialObj.imageUrl}
        alt={credentialObj.credentialType}
        style={{ height: '400px' }}
      />
      <Card.Body>
        <Card.Title>{credentialObj.credentialType}</Card.Title>
        <h4>Valid till: {credentialObj.expirationDate}</h4>
        <Link href={`/credentials/edit/${credentialObj.credentialId}`} passHref>
          <Button variant="primary" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCredential} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

CredentialCard.propTypes = {
  credentialObj: PropTypes.shape({
    credentialId: PropTypes.string,
    imageUrl: PropTypes.string,
    credentialType: PropTypes.string,
    expirationDate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CredentialCard;
