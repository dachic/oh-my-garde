
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = { "Content-Type": "application/json" }

export default {

  add(pharmacy) {
    return fetch(uri('pharmacies'), {
      method: 'POST',
      headers: headers,
      body: pharmacy
    }).then((response) => {
      Promise.resolve(response);
    }).catch(error => Promise.reject(error.response));
  },

  getAll() {
    return fetch(uri('hospitals'), {
      method: 'GET',
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      return Promise.resolve(data['hydra:member']);
    }).catch(error => Promise.reject(error));
  },
};
