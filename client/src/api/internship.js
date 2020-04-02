
import { getLoggedInUser } from '../helpers/authUtils';

const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

const loggedInUser = getLoggedInUser();

export default {
  add(form) {
    return fetch(uri('interships'), {
      method: 'POST',
      headers: headers,
      body: form
    }).then((response) => {
      if (response.status === 400 || response.status === 404) {
        return response.json()
          .catch(() => {
            // Couldn't parse the JSON
            return Promise.reject({ error: "Une erreur inattendue s'est produite lors de la lectuer des données. Ré-essayez !" });
          }).then((data) => {
            // Got valid JSON with error response, use it
            if (data.success === false) {
              return Promise.reject(data.message);
            } else {
              return Promise.reject({ error: "Une erreur inattendue s'est produite lors de l'envoi des données. Ré-essayez !" });
            }
          });
      }
      Promise.resolve(response);
    }).catch(function (errors) {
      return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer." })
    });
  },
  getAll(form) {
    return fetch(uri('interships'), {
      method: 'POST',
      headers: headers,
      body: form
    }).then((response) => {
      if (response.status === 400 || response.status === 404) {
        return response.json()
          .catch(() => {
            // Couldn't parse the JSON
            return Promise.reject({ error: "Une erreur inattendue s'est produite lors de la lectuer des données. Ré-essayez !" });
          }).then((data) => {
            // Got valid JSON with error response, use it
            if (data.success === false) {
              return Promise.reject(data.message);
            } else {
              return Promise.reject({ error: "Une erreur inattendue s'est produite lors de l'envoi des données. Ré-essayez !" });
            }
          });
      }
      Promise.resolve(response);
    }).catch(function (errors) {
      return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer." })
    });
  },
  getUsersInternships() {
    return fetch("http://api.localhost/user/" + loggedInUser.id + "/internships", {
      method: 'GET'
    }).then((response) => {
      if (response.status === 500) {
        return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer." })
      }
      return response.json();
    }).then(function (data) {
      return Promise.resolve(data.data);
    }).catch(function (errors) {
      return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer." })
    });
  }
};
