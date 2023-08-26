import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function PhysicianCard({ physicianObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img
        variant="top"
        src={physicianObj.image}
        alt={physicianObj.firstName}
        style={{ height: '400px' }}
      />
      <Card.Body>
        <Card.Title>{physicianObj.firstName}</Card.Title>
        <p>{physicianObj.lastName}</p>
        <p>{physicianObj.telephoneNumber}</p>
        <p>{physicianObj.email}</p>
        <Link href={`/credential/view/${physicianObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW CREDENTIALS</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PhysicianCard.propTypes = {
  physicianObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    telephoneNumber: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default PhysicianCard;
