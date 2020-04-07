import { getLoggedInUser } from '../helpers/authUtils';
import { fetchJSON } from '../helpers/api'

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };
const loggedInUser = getLoggedInUser();

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + loggedInUser ? loggedInUser.token : ""
}

export default {
  async get(guard) {
    const properties = "?properties[pharmacy]=name&properties[]=day&properties[]=status&properties[agrements]=name&properties[hour]=name&properties[job]=title"
    const res = fetchJSON(url + '/guards/' + guard + properties, {
      method: 'GET',
      headers: headers
    })
    return await res
  },

  async getInternsRankingForGuard(guard) {
    const res = fetchJSON(url + '/guard/matching/' + guard, {
      method: 'GET',
      headers: headers
    })
    return await res
  },

  async assignInternToGuard(guard, intern) {
    const res = fetchJSON(url + '/guard/assign/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ guard: guard, intern: intern.id })
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
      return Promise.resolve(response);
    }).catch(error => console.log(error.response));
  },

  getAll() {
    const properties = "&properties[pharmacy]=hospital&properties[]=day&properties[]=status&properties[]=id&properties[agrements]=name&properties[hour]=name&properties[job]=title&properties[user]=firstname"
    if (loggedInUser.pharmacy) {
      return fetch(uri(`/guards?pharmacy=${loggedInUser.pharmacy}${properties}`), {
        method: 'GET',
        headers: headers
      }).then((response) => {
        // convert data from ReadableStream to JSON
        return response.json();
      }).then(function (data) {
        return Promise.resolve(data);
      }).catch(error => Promise.reject({ error: 'Une erreur est survenue lors du chargement.' }));
    }
    else {
      return Promise.resolve([]);
    }

  },
};
