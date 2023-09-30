import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updatePhysicianDb, createPhysicianDb } from '../../api/physicianData';

const initialState = {
  physicianId: '',
  firstName: '',
  npiNumber: '',
  image: '',
};

function PhysicianForm({ physicianObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (physicianObj.physicianId) setFormInput(physicianObj);
  }, [physicianObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (physicianObj.physicianId) {
      updatePhysicianDb(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPhysicianDb(payload).then(({ name }) => {
        const patchPayload = { physicianId: name };
        updatePhysicianDb(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{physicianObj.physicianId ? 'Update' : 'Create'} Physician</h2>
      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Physician's Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          name="displayName"
          value={formInput.displayName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Describe Yourself"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="fieldofstudy" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Field Of Study "
          name="fieldOfStudy"
          value={formInput.fieldOfStudy}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="experience" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Experience "
          name="experience"
          value={formInput.experience}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="hospitalName" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Hospital Name "
          name="hospitalName"
          value={formInput.hospitalName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="languages" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Languages "
          name="languages"
          value={formInput.languages}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="typeOf" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Type Of "
          name="typeOf"
          value={formInput.typeOf}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email "
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="NPI Number">
        <Form.Control
          type="string"
          placeholder="Enter NPI number"
          name="npiNumber"
          value={formInput.npiNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{physicianObj.physicianId ? 'Update' : 'Create'} Profile</Button>
    </Form>
  );
}

PhysicianForm.propTypes = {
  physicianObj: PropTypes.shape({
    physicianId: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    npiNumber: PropTypes.string,
    image: PropTypes.string,
    state: PropTypes.string,
    telephoneNumber: PropTypes.string,
    email: PropTypes.string,
  }),
};

PhysicianForm.defaultProps = {
  physicianObj: initialState,
};

export default PhysicianForm;
