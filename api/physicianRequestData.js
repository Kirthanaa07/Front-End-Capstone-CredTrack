import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllPhysiciansRequestDb = (credentialId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physicianRequest/${credentialId}.json`, {
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
const createPhysicianRequestDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physicianRequest.json`, {
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

// TODO: UPDATE Request
const updatePhysicianRequestDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physicianRequest/${payload.physicianRequestId}.json`, {
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

// TODO: DELETE Request
const deletePhysicianRequestDb = (physicianRequestId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physicianRequest/${physicianRequestId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllPhysiciansRequestDb,
  createPhysicianRequestDb,
  updatePhysicianRequestDb,
  deletePhysicianRequestDb,
};
