import { getLoggedInUser } from '../authUtils';

const url = process.env.REACT_APP_API_URL
const loggedInUser = getLoggedInUser()

const findAllUsersApi = (page = 1, itemsPerPage = 10) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser.token
        },
    };

    return fetch(`${url}/users?pagination=true&page=${page}&itemsPerPage=${itemsPerPage}`, options).then(response => {
        return response.json()
    }).then((users) => {
        return users;
    })
}

const findAllInternUsersApi = (page = 1, itemsPerPage = 10) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser.token
        },
    };

    return fetch(`${url}/users?pagination=true&page=${page}&itemsPerPage=${itemsPerPage}&roles=ROLE_INTERN`, options).then(response => {
        return response.json()
    }).then((users) => {
        return users;
    })
}

const findAllUserByIdApi = (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser.token
        },
    };

    return fetch(`${url}/users?id=${id}`, options).then(response => {
        return response.json()
    }).then((users) => {
        if (users.length !== 0) {
            return users[0];
        }
        return [];
    })
}

const saveUserInfoApi = ({ id, firstname, lastname, status }) => {

    const options = {
        method: 'PATCH',
        body: JSON.stringify({ firstname, lastname, status }),
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser.token
        }
    };

    return fetch(`${url}/users/${id}`, options).then(response => {
        return response.json()
    }).then((user) => {
        return user;
    })
}

const saveAccountInformation = ({ id, firstname, lastname, email, phoneNumber }) => {

    const options = {
        method: 'PATCH',
        body: JSON.stringify({ firstname, lastname, email, phoneNumber }),
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser.token
        }
    };

    return fetch(`${url}/users/${id}`, options).then(response => {
        return response.json()
    }).then((user) => {
        return user;
    })
}

export {
    findAllUsersApi,
    findAllUserByIdApi,
    saveUserInfoApi,
    findAllInternUsersApi,
    saveAccountInformation
}
