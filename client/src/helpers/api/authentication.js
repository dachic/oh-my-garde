const loginApi = (endpoint, options) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options)
            .then(response => {
                if (response.status === 401) {
                    reject('Votre email ou mot de passe est incorrect');
                }

                if (response.status === 500) {
                    reject("Une erreur inattendue s'est produite");
                }

                return response.json()
            })
            .then(user => {
                if (user.status === 'enabled') {
                    // successfully logged in
                    resolve(user);
                } else {
                    reject("Désolé mais votre compte n'est pas encore activé 😅. Veuillez contacter l'administrateur");
                }
            })
            .catch(() => {
                reject("Une erreur inattendue s'est produite");
            });
    });
}

const registerApi = (endpoint, options) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options)
            .then(response => {
                if (response.status === 500) {
                    reject("Une erreur inattendue s'est produite");
                }

                if (response.status === 400) {
                    return response.json()
                        .catch(() => {
                            // Couldn't parse the JSON
                            // throw new Error(response.status);
                            reject("Une erreur inattendue s'est produite lors de la lectuer des données. Ré-essayez !");
                        }).then((data) => {
                            // Got valid JSON with error response, use it
                            if (data.success === false) {
                                reject(data.message);
                            } else {
                                reject("Une erreur inattendue s'est produite lors de l'envoi des données. Ré-essayez !");
                            }
                            // throw new Error(message || response.status);
                        });
                }

                return response.json()
            })
            .then(response => {
                if (response.success === true) {
                    resolve(response.message);
                } if (response.success === false) {
                    reject(response.message);
                } else {
                    reject("Désolé mais une erreur inattendue s'est produite");
                }
            })
            .catch(() => {
                reject("Une erreur inattendue s'est produite");
            });
    });
}


export { loginApi, registerApi };
