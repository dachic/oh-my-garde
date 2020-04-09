
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

    addLinkedPharmacy(pharmacy) {
        return fetch(uri('/pharmacies'), {
            method: 'POST',
            headers: headers,
            body: pharmacy
        }).then((response) => {
            if (response.status === 500) {
                return Promise.reject({ error: "Une erreur est survenue, veuillez réessayer.." })
            }
            return Promise.resolve(response.json());
        }).catch(error => Promise.reject({
            error: 'Il semblerait qu\'il exite déjà une pharmacie liée à cet hôpital.'
        }));
    },
    getAll() {
        return fetch(uri('/hospitals'), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            // convert data from ReadableStream to JSON
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    getSpecific(id) {
        return fetch(uri(`/hospitals/${id}`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            // convert data from ReadableStream to JSON
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    }
};
