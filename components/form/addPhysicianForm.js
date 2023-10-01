import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updatePhysicianDb, createPhysicianDb } from '../../api/physicianData';

const initialState = {
  physicianId: '',
  firstName: '',
  npiNumber: '',
  image: '',
};

function PhysicianForm({ physicianObj, handleSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

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

  const savePhysician = (e) => {
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
    handleSubmit();
  };

  return (

    <Form onSubmit={savePhysician} id="physician-form">
      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Physician's Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={formInput.displayName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Telephone Number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Telephone Number"
          name="telephoneNumber"
          value={formInput.telephoneNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Address 1" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Address 1"
          name="address1"
          value={formInput.address1}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Address 2" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Address 2"
          name="address2"
          value={formInput.address2}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Row className="mb-3">
        <FloatingLabel controlId="floatingInput1" label="City" className="mb-3">
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={formInput.city}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="State" className="mb-3">
          <Form.Select
            type="text"
            placeholder="State"
            name="state"
            value={formInput.state}
            onChange={handleChange}
            required
          >
            <option value="">Select From Below</option>
            {
              states.map((state) => (
                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Zip Code" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Zip Code"
            name="postalCode"
            value={formInput.postalCode}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Row>

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
      <FloatingLabel controlId="floatingInput1" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Describe Yourself"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Field of Study" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Field Of Study"
          name="fieldOfStudy"
          value={formInput.fieldOfStudy}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Experience" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Experience"
          name="experience"
          value={formInput.experience}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Hospital Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Hospital Name"
          name="hospitalName"
          value={formInput.hospitalName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Languages" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Languages"
          name="languages"
          value={formInput.languages}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Specialty" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Specialty"
          name="typeOf"
          value={formInput.typeOf}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
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
  handleSubmit: PropTypes.func.isRequired,
};

PhysicianForm.defaultProps = {
  physicianObj: initialState,
};

export default PhysicianForm;
