import { getLoggedInUser } from '../helpers/authUtils';
import {fetchJSON} from '../helpers/api'

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };
const loggedInUser = getLoggedInUser();

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + loggedInUser.token
}

export default {
    async get(guard){
        const res = fetchJSON(url + '/guards/' + guard,{
            method:'GET',
            headers:headers
        })
        return await res
    },

    async getInternsRankingForGuard(guard){
        const res = fetchJSON(url + '/guard/matching/' + guard,{
            method:'GET',
            headers:headers
        })
        return await res
    },

    async assignInternToGuard(guard,intern){
        const res = fetchJSON(url + '/guard/assign/',{
            method:'POST',
            headers:headers,
            body: JSON.stringify({guard:guard,intern:intern.id})
        })

        return await res
    },

  add(guard) {
    return fetch(uri('/guards'), {
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
    return fetch(uri('/guard'), {
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