// https://codepen.io/hodakkm/pen/vJBBmv

const endpoint = 'https://cors-anywhere.herokuapp.com/https://npiregistry.cms.hhs.gov/api/?version=2.1';

const getPhysicianByNpiNumber = (npiNumber) => new Promise((resolve, reject) => {
  fetch(`${endpoint}&number=${npiNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result_count === 1) {
        resolve(data.results[0]);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getPhysicianByNpiNumber;
