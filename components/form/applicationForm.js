import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createPhysicianRequestDb, updatePhysicianRequestDb } from '../../api/physicianRequestData';

const initialState = {
  npiNumber: '',
};

function ApplicationForm({ handleSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const saveApplication = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, uid: user.uid, displayName: user.displayName, status: 'Submitted',
    };
    createPhysicianRequestDb(payload).then(({ name }) => {
      const patchPayload = { physicianRequestId: name };
      updatePhysicianRequestDb(patchPayload).then(() => {
        alert('Your NPI number is taken for review successfully');
        handleSubmit();
        router.push('/');
      });
    });
  };

  return (
    <Form onSubmit={saveApplication} id="application-form">
      <FloatingLabel controlId="floatingSelect" label="NPI Number">
        <Form.Control
          type="string"
          placeholder="Enter Your NPI Number"
          name="npiNumber"
          value={formInput.npiNumber || ''}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
    </Form>

  );
}

ApplicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ApplicationForm;
