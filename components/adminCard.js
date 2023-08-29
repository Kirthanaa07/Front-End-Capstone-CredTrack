import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

function AdminPage({ adminObj }) {
  return (
    <>
      <div className="d-flex flex-column flex-grow-1 gap-3 p-2 b-white">
        <div className="d-flex flex-row gap-3">
          <Image src={adminObj.image} alt={adminObj.firstName} />
          <div className="d-flex flex-column flex-grow-1">
            <p>{adminObj.firstName} {adminObj.lastName}</p>
            <p>{adminObj.telephoneNumber}</p>
            <p>{adminObj.email}</p>
          </div>
        </div>
        <div>{adminObj.description}</div>
        <div className="flex-grow-0 d-flex justify-content-end">
          <Link href={`/credentials/${adminObj.uid}`} passHref>
            <Button variant="primary" className="m-2">VIEW CREDENTIALS</Button>
          </Link>
        </div>
      </div>

    </>
  );
}

AdminPage.propTypes = {
  adminObj: PropTypes.shape({
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

export default AdminPage;
