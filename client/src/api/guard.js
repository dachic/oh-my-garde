import { getLoggedInUser } from '../helpers/authUtils';
import { fetchJSON } from '../helpers/api'

const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };
const loggedInUser = getLoggedInUser();

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + loggedInUser.token
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
            if (response.status === 500 || response.status === 401) {
                // Couldn't parse the JSON
                return Promise.reject({ error: "Une erreur inattendue s'est produite lors de la lectuer des données. Ré-essayez !" });
            }
            return Promise.resolve(response);
        }).catch(error => console.log(error.response));
    },
    getAll(entity) {
        const properties = "&properties[pharmacy]=hospital&properties[]=day&properties[]=status&properties[]=date&properties[]=id&properties[agrements]=name&properties[hour]=name&properties[job]=title&properties[user]=firstname"
        let filterReq = ''
        // Guards form specific pharmacy
        if (loggedInUser.pharmacy && entity === 'pharmacy') {
            filterReq = `/guards?pharmacy=${loggedInUser.pharmacy}${properties}`;
        }
        // Guards form specific user
        else if (entity === 'intern') {
            filterReq = `/guards?user=${loggedInUser.id}${properties}`;
        }
        else {
            return Promise.resolve([]);

        }
        return fetch(uri(filterReq), {
            method: 'GET',
            headers: headers
        }).then((response) => {
            // convert data from ReadableStream to JSON
            return response.json();
        }).then(function (data) {
            return Promise.resolve(data);
        }).catch(error => Promise.reject({ error: 'Une erreur est survenue lors du chargement des données.' }));
    },
    findAllGuardPaginated(page = 1, itemsPerPage = 10) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser.token
            },
        };

        const properties = 'properties[user][]=fullname&properties[pharmacy][]=name&properties[hour][]=name&properties[]=createdAt&properties[]=updatedAt&properties[]=status'
        return fetch(`${url}/guards?pagination=true&page=${page}&itemsPerPage=${itemsPerPage}&${properties}`, options).then(response => {
            return response.json()
        }).then((users) => {
            return users;
        })
    },
    findAllPendingGuardPaginated(page = 1, itemsPerPage = 10) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser.token
            },
        };

        const properties = 'properties[user][]=fullname&properties[pharmacy][]=name&properties[hour][]=name&properties[]=createdAt&properties[]=updatedAt&properties[]=status&status=pending'
        return fetch(`${url}/guards?pagination=true&page=${page}&itemsPerPage=${itemsPerPage}&${properties}`, options).then(response => {
            return response.json()
        }).then((users) => {
            return users;
        })
    }
};
