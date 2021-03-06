
import { getLoggedInUser } from '../helpers/authUtils';

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path }

const loggedInUser = getLoggedInUser();

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + (loggedInUser ? loggedInUser.token : "")
}

export default {
    isAvailable(hour, day) {
        return fetch(uri(`/disponibilities?user.id=${loggedInUser.id}&day=${day}&hour.id=${hour}`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data.length === 0);
        }).catch(error => Promise.reject(error));
    },
    findDisponibilityByHourAndDay(hour, day) {
        return fetch(uri(`/disponibilities?user.id=${loggedInUser.id}&day=${day}&hour.id=${hour}`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    saveDisponibility(hour, day) {
        return fetch(uri(`/disponibilities`), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                day,
                user: `/api/users/${loggedInUser.id}`,
                hour: `/api/disponibility_hours/${hour}`
            })
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    findAllUserDisponibilities() {
        return fetch(uri(`/disponibilities?user.id=${loggedInUser.id}&properties[hour]=name&properties[]=id&properties[]=day&properties[]=createdAt&properties[]=updatedAt`), {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    findDisponibilityById(id) {
        return fetch(uri(`/disponibilities?user.id=${loggedInUser.id}&id=${id}&properties[hour]=name&properties[]=id&properties[]=day&properties[]=createdAt&properties[]=updatedAt`), {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
    updateDisponibility(id, hour, day) {
        headers['Content-Type'] = 'application/merge-patch+json';
        return fetch(uri(`/disponibilities/${id}`), {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({
                day,
                hour: `/api/disponibility_hours/${hour}`
            })
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    },
};
