import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCredential, getSingleCredential, updateCredential } from '../../api/credentialData';

const initialState = {
  credType: '',
  imageUrl: '',
  expirationDate: '',
};

function CredentialForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [credentials, setCredential] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getSingleCredential(user.uid).then(setCredential);

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
      updateCredential(formInput).then(() => router.push(`/credential/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCredential(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCredential(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Cred</h2>
      {/* CRED SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Credential Type">
        <Form.Select
          aria-label="Credential Type"
          name="uid"
          onChange={handleChange}
          className="mb-3"
          value={obj.uid}
          required
        >
          <option value="">Select From Below</option>
          {
            credentials.map((cred) => (
              <option
                key={cred.firebaseKey}
                value={cred.firebaseKey}
              >
                {cred.credType}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Cred Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EXPIRATION DATE */}
      <FloatingLabel controlId="floatingInput3" label="Expiration Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Expiration date"
          name="expirationDate"
          value={formInput.expirationDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Credential</Button>
    </Form>
  );
}

CredentialForm.propTypes = {
  obj: PropTypes.shape({
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    credType: PropTypes.string,
    imageUrl: PropTypes.string,
    expirationDate: PropTypes.string,
  }),
};

CredentialForm.defaultProps = {
  obj: initialState,
};

export default CredentialForm;
