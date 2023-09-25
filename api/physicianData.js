import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSinglePhysicianDb = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physician.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data)[0]);
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

// TODO: CREATE PHYSICIAN
const createPhysicianDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physician.json`, {
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

// TODO: UPDATE PHYSICIAN
const updatePhysicianDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physician/${payload.physicianId}.json`, {
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

// TODO: DELETE PHYSICIAN
const deletePhysicianDb = (physicianId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physician/${physicianId}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// TODO: GET ALL PHYSICIAN
const getAllPhysiciansDb = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/physician.json`, {
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
  getSinglePhysicianDb,
  createPhysicianDb,
  updatePhysicianDb,
  deletePhysicianDb,
  getAllPhysiciansDb,
};
