import { getLoggedInUser } from '../helpers/authUtils';

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };

const loggedInUser = getLoggedInUser();

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + (loggedInUser ? loggedInUser.token : "")
}

export default {
    getPharmacyId() {
        return fetch(uri(`/user/${loggedInUser.id}/pharmacy`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            // convert data from ReadableStream to JSON
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data.data);
        }).catch(error => Promise.reject(error));
    },
    registerUser(user) {
        return fetch(uri(`/users`), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user)
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    checkUserGuard(userId, guardid) {
        delete headers['Authorization']
        return fetch(uri(`/user/${userId}/check/${guardid}`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            // convert data from ReadableStream to JSON
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    getPharmacy() {
        const properties = "?properties[pharmacy]=name"
        return fetch(uri(`/users/${loggedInUser.id}/${properties}`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            // convert data from ReadableStream to JSON
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject({ error: 'Une erreur est survenue lors du chargement.' }));
    }
};
