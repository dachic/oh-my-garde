
import { getLoggedInUser } from '../helpers/authUtils';

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path }

const loggedInUser = getLoggedInUser();

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer " + loggedInUser.token
}

export default {

  getAll() {
    return fetch(uri('/agrements'), {
      method: 'GET',
      headers: headers
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      // console.log("api response", data['hydra:member']);
      return Promise.resolve(data['hydra:member']);
    }).catch(error => Promise.reject(error));
  },
};
