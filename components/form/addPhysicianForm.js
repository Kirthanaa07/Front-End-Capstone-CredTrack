import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSinglePhysician, updatePhysician, createPhysician } from '../../api/physicianData';

const initialState = {
  firebaseKey: '',
  first_name: '',
  last: '',
  image: '',
};

function PhysicianForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [physician, setPhysician] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getSinglePhysician(user.uid).then(setPhysician);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePhysician(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPhysician(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePhysician(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Physician</h2>
      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Physician's Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          name="first_name"
          value={formInput.first_name}
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
      <FloatingLabel controlId="floatingSelect" label="NPI Number">
        <Form.Select
          aria-label="NPI Number"
          name="npiNumber"
          onChange={handleChange}
          className="mb-3"
          value={obj.npiNumber} // FIXME: modify code to remove error
          required
        >
          <option value="">Select Your Specification</option>
          {
            physician.map((item) => (
              <option
                key={item.firebaseKey}
                value={item.firebaseKey}
              >
                {item.physician}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Profile</Button>
    </Form>
  );
}

PhysicianForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    npiNumber: PropTypes.number,
    image: PropTypes.string,
    telephone_number: PropTypes.string,
    email: PropTypes.string,
  }),
};

PhysicianForm.defaultProps = {
  obj: initialState,
};

export default PhysicianForm;
