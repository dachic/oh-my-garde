
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = { "Content-Type": "application/json" }

export default {

  add(pharmacy) {
    return fetch(uri('auth/register'), {
      method: 'POST',
      headers: headers,
      body: pharmacy
      // return axios({
      //   method: 'post',
      //   url: uri("pharmacies"),
      //   data: pharmacy,
    }).then((response) => {
      // TODO: Replace that by store storage when context will be added
      localStorage.setItem("user", JSON.stringify(response.data));
      Promise.resolve(response.data);
    }).catch(error => Promise.reject(error.response));
  }
};
