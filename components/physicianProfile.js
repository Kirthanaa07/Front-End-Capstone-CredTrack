import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

function PhysicianProfile({ physicianObj }) {
  return (
    <>
      <div className="d-flex flex-column flex-grow-1 gap-3 p-2 b-white">
        <div className="d-flex flex-row flex-grow-1 gap-3">
          <Image src={physicianObj.image} alt={physicianObj.firstName} />
          <div className="d-flex flex-column flex-grow-1">
            <p>{physicianObj.firstName} {physicianObj.lastName}</p>
            <p>{physicianObj.telephoneNumber}</p>
            <p>{physicianObj.email}</p>
          </div>
        </div>
        <div>{physicianObj.description}</div>
        <div className="flex-grow-0 d-flex justify-content-end">
          <Link href={`/credentials/${physicianObj.uid}`} passHref>
            <Button variant="primary" className="m-2">VIEW CREDENTIALS</Button>
          </Link>
        </div>
      </div>

    </>
  );
}

PhysicianProfile.propTypes = {
  physicianObj: PropTypes.shape({
    physicianId: PropTypes.string,
    uid: PropTypes.string,
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    telephoneNumber: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default PhysicianProfile;
