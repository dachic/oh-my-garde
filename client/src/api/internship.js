
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = { "Content-Type": "application/json" }

export default {
  add(form) {
    return fetch(uri('intershipsd'), {
      method: 'POST',
      headers: headers,
      body: form
    }).then((response) => {
      Promise.resolve(response);
    }).catch(function (error) {
      console.log(error);
      Promise.reject(error)
    });
  },
};
