
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

export default {
  checkUserGuard(userId, guardid) {
    return fetch(`user/${userId}/check/${guardid}`, {
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
