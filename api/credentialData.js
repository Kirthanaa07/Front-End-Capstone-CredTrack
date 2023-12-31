import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleCredentialDb = (credentialId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/credential/${credentialId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => { resolve(data); })
    .catch(reject);
});

// TODO: CREATE Credential
const createCredentialDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/credential.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE Credential
const updateCredentialDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/credential/${payload.credentialId}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: DELETE Credential
const deleteCredentialDb = (credentialId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/credential/${credentialId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET ALL Credential
const getAllCredentialsForPhysicianDb = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/credential.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getSingleCredentialDb,
  createCredentialDb,
  updateCredentialDb,
  deleteCredentialDb,
  getAllCredentialsForPhysicianDb,
};
