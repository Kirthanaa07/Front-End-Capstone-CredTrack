import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCredentialDb, updateCredentialDb } from '../../api/credentialData';
import getAllCredentialTypesDb from '../../api/credentialTypeData';

const initialState = {
  credentialType: '',
  imageUrl: '',
  expirationDate: '',
};

function CredentialForm({ credentialObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [credentialTypes, setCredentialTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllCredentialTypesDb().then(setCredentialTypes);

    if (credentialObj.credentialId) setFormInput(credentialObj);
  }, [credentialObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentialObj.credentialId) {
      updateCredentialDb(formInput).then(() => router.push(`/credentials/${credentialObj.uid}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCredentialDb(payload).then(({ name }) => {
        const patchPayload = { credentialId: name };
        updateCredentialDb(patchPayload).then(() => {
          router.push(`/credentials/${user.uid}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{credentialObj.credentialId ? 'Update' : 'Add'} Cred</h2>
      {/* CRED SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Credential Type">
        <Form.Select
          aria-label="Credential Type"
          name="credentialType"
          onChange={handleChange}
          className="mb-3"
          value={formInput.credentialType}
          required
        >
          <option value="">Select From Below</option>
          {
            credentialTypes.map((credentialType) => (
              <option
                key={credentialType.credentialTypeId}
                value={credentialType.name}
              >
                {credentialType.name}
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
          type="date"
          placeholder="Enter Expiration date"
          name="expirationDate"
          value={formInput.expirationDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{credentialObj.credentialId ? 'Update' : 'Add'} Credential</Button>
    </Form>
  );
}

CredentialForm.propTypes = {
  credentialObj: PropTypes.shape({
    credentialId: PropTypes.string,
    uid: PropTypes.string,
    credentialType: PropTypes.string,
    imageUrl: PropTypes.string,
    expirationDate: PropTypes.string,
  }),
};

CredentialForm.defaultProps = {
  credentialObj: initialState,
};

export default CredentialForm;
