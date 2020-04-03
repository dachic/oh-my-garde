import { getLoggedInUser } from '../helpers/authUtils';

const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }
const loggedInUser = getLoggedInUser();

const headers = {
  'Accept': 'application/json', 
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + loggedInUser.token
}

export default {

  add(guard) {
    return fetch(uri('guards'), {
      method: 'POST',
      headers: headers,
      body: guard
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then((response) => {
      //console.log('api', response);
      return Promise.resolve(response);
    }).catch(error => Promise.reject(error.response));
  },

  getAll() {
    return fetch(uri('guard'), {
      method: 'GET',
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      // console.log("api response", data['hydra:member']);
      return Promise.resolve(data['hydra:member']);
    }).catch(error => Promise.reject(error));
  },
};
