
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
    add(form) {
        return fetch(uri('/interships'), {
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
        return fetch(uri('/interships'), {
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
            return Promise.resolve(response);
        }).catch(function (errors) {
            return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer." })
        });
    },
    getUsersInternships() {
        return fetch(uri(`/user/${loggedInUser.id}/internships`), {
            method: 'GET',
            headers: headers
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
    },
    getSpecific(id) {
        return fetch(uri(`/internship/${id}`), {
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
        return fetch(uri(`/interships/${id}`), {
            method: 'PUT',
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
    }
};
