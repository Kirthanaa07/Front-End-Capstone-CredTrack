import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleUserDb = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user.json?orderBy="uid"&equalTo="${uid}"`, {
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

// TODO: CREATE USER
const createUserDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user.json`, {
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

// TODO: UPDATE USER
const updateUserDb = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${payload.userId}.json`, {
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

export { getSingleUserDb, createUserDb, updateUserDb };
