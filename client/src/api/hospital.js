
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = { "Content-Type": "application/json" }

export default {

  addLinkedPharmacy(pharmacy) {
    return fetch(uri('pharmacies'), {
      method: 'POST',
      headers: headers,
      body: pharmacy
    }).then((response) => {
      if (response.status === 500) {
        return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer.." })
      }
      return Promise.resolve(response);
    }).catch(error => Promise.reject({
      error: 'Il semblerait qu\'il exite déjà une pharmacie liée à cet hôpital.'
    }));
  },

  getAll() {
    return fetch(uri('hospitals'), {
      method: 'GET',
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      return Promise.resolve(data['hydra:member']);
    }).catch(error => Promise.reject(error));
  },
};
