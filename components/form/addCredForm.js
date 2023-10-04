import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import getAllCredentialTypesDb from '../../api/credentialTypeData';
import { createCredentialDb, getAllCredentialsForPhysicianDb, updateCredentialDb } from '../../api/credentialData';

const initialState = {
  credentialType: '',
  imageUrl: '',
  expirationDate: '',
};

function CredentialForm({ physicianUid, credentialObj, handleSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const [credentialTypes, setCredentialTypes] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getAllCredentialsForPhysicianDb(physicianUid).then((physCreds) => {
      getAllCredentialTypesDb().then((types) => {
        if (credentialObj.credentialId) {
          setCredentialTypes(types);
        } else {
          const physCredTypes = physCreds.map((c) => c.credentialType);
          const filteredTypes = types.filter((t) => physCredTypes.indexOf(t.name) === -1);
          setCredentialTypes(filteredTypes);
        }
      });
    });
    if (credentialObj.credentialId) setFormInput(credentialObj);
  }, [credentialObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveCredential = (e) => {
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
    handleSubmit();
  };

  return (
    <Form onSubmit={saveCredential} id="cred-form">
      {/* CRED SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Credential Type">
        <Form.Select
          aria-label="Credential Type"
          name="credentialType"
          disabled={credentialObj.credentialId}
          onChange={handleChange}
          className="mb-3"
          value={formInput.credentialType || ''}
          required
        >
          <option value="">Select From Below</option>
          {
            credentialTypes.map((credentialType) => (
              <option
                key={credentialType.credentialTypeId}
                value={credentialType.name || ''}
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
          value={formInput.imageUrl || ''}
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
          value={formInput.expirationDate || ''}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
    </Form>
  );
}

CredentialForm.propTypes = {
  physicianUid: PropTypes.string,
  credentialObj: PropTypes.shape({
    credentialId: PropTypes.string,
    uid: PropTypes.string,
    credentialType: PropTypes.string,
    imageUrl: PropTypes.string,
    expirationDate: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
};

CredentialForm.defaultProps = {
  physicianUid: '',
  credentialObj: initialState,
};

export default CredentialForm;
