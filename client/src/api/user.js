
import { getLoggedInUser } from '../helpers/authUtils';

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };

const loggedInUser = getLoggedInUser();

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer " + loggedInUser.token
}

export default {
  getPharmacy() {
    return fetch(uri(`/user/${loggedInUser.id}/pharmacy`), {
      method: 'GET',
      headers: headers
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      return Promise.resolve(data.data);
    }).catch(error => Promise.reject(error));
  }
};
