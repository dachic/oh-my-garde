
const url = "http://api.localhost/api/"
let uri = (path) => { return url + path }

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

export default {

  getSpecific(id) {
    return fetch(uri(`pharmacy/${id}`), {
      method: 'GET',
      headers: headers
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      return Promise.resolve(data.data);
    }).catch(error => Promise.reject(error));
  },
  updateSpecific(form, id) {
    return fetch(uri(`pharmacies/${id}`), {
      method: 'PUT',
      headers: headers,
      body: form
    }).then((response) => {
      if (response.status === 400 || response.status === 404) {
        return response.json()
          .catch(() => {
            // Couldn't parse the JSON
            return Promise.reject({ error: "Une erreur inattendue s'est produite lors de la mise à jour. Ré-essayez !" });
          }).then((data) => {
            // Got valid JSON with error response, use it
            if (data.success === false) {
              return Promise.reject(data.message);
            } else {
              return Promise.reject({ error: "Une erreur inattendue s'est produite lors de la mise à jour. Ré-essayez !" });
            }
          });
      }
      Promise.resolve(response);
    }).catch(function (errors) {
      return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer." })
    });
  }
};
