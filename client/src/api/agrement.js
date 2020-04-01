
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

// const headers = { "Content-Type": "application/json" }

export default {

  getAll() {
    return fetch(uri('agrements'), {
      method: 'GET',
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      // console.log("api response", data['hydra:member']);
      return Promise.resolve(data['hydra:member']);
    }).catch(error => Promise.reject(error.response));
  },
};
