
import { getLoggedInUser } from '../helpers/authUtils';
import {fetchJSON} from '../helpers/api'

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };

const loggedInUser = getLoggedInUser();

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer " + loggedInUser.token
}

export default {
  async export(){
    const res = fetchJSON(url + '/user/guard/count',{
        method:'GET',
        headers:headers
    })
    return await res
  },
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
