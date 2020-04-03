
const url = process.env.REACT_APP_API_URL;
let uri = (path) => { return url + path };

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

export default {
  checkUserGuard(userId, guardid) {
    return fetch(`http://api.localhost/user/${userId}/check/${guardid}`, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      // convert data from ReadableStream to JSON
      return response.json();
    }).then(function (data) {
      return Promise.resolve(data);
    }).catch(error => Promise.reject(error));

  }
}
