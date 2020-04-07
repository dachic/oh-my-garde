import { getLoggedInUser } from '../authUtils';

const url = process.env.REACT_APP_API_URL
const loggedInUser = getLoggedInUser()

const findAllUsersApi = () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedInUser.token
        },
    };

    return fetch(`${url}/users?pagination=true`, options).then(response => {
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

const saveUserInfoApi = ({id, firstname, lastname, status}) => {

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

const AddUserInfoApi = ({id, firstname, lastname, status}) => {

    const options = {
        method: 'POST',
        body: JSON.stringify({ firstname, lastname, status }),
        headers: {
            'Content-Type': 'application/json',
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

export { findAllUsersApi, findAllUserByIdApi, saveUserInfoApi, AddUserInfoApi }
