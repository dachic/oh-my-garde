/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => {
            throw error;
        });
};

const loginApi = (url, options) => {
    return new Promise((resolve, reject) => {
         fetch(`${process.env.REACT_APP_API_URL}/login`, options)
            .then(response => {
                if (response.status === 401) {
                    reject('Votre email ou mot de passe est incorrect');
                }

                if (response.status === 500) {
                    reject("Une erreur inattendue s'est produite");
                }

                return response.json()
            })
            .then(response => {
                resolve(response);
            })
            .catch(() => {
                reject("Une erreur inattendue s'est produite");
            });
    });
}

export { fetchJSON, loginApi };
