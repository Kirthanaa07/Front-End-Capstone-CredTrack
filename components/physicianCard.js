import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePhysician } from '../api/physicianData';

function PhysicianCard({ physicianObj, onUpdate }) {
  const deleteThisPhysician = () => {
    if (window.confirm(`Delete ${physicianObj.first_name}?`)) {
      deletePhysician(physicianObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={physicianObj.image}
        alt={physicianObj.first_name}
        style={{ height: '400px' }}
      />
      <Card.Body>
        <Card.Title>{physicianObj.first_name}</Card.Title>
        <p>{physicianObj.last_name}</p>
        <Link href={`/team/edit/${physicianObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPhysician} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

PhysicianCard.propTypes = {
  physicianObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhysicianCard;
