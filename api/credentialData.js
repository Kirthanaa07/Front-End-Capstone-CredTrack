import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleCredential = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Credential.json?orderBy="uid"&equalTo="${uid}"`, {
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

// TODO: CREATE Credential
const createCredential = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Credential.json`, {
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
const updateCredential = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Credential/${payload.firebaseKey}.json`, {
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
const deleteCredential = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Credential/${firebaseKey}.json`, {
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
const getAllCredentials = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Credential/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSingleCredential,
  createCredential,
  updateCredential,
  deleteCredential,
  getAllCredentials,
};
