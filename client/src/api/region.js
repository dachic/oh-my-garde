
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
    getAllRegions() {
        delete headers['Authorization']
        return fetch(uri(`/regions`), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject(error));
    }
};
