
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = { "Content-Type": "application/json" }

export default {
  add(form) {
    return fetch(uri('interships'), {
      method: 'POST',
      headers: headers,
      body: form
    }).then((response) => {
      Promise.resolve(response);
    }).catch(error => Promise.reject(error.response));
  },
};
