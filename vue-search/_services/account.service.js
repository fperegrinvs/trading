export const accountService = {
    login,
    loginVersion2
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    }
    return fetch(`${process.env.apiUrl}/api-token-auth`,
            requestOptions).then(handleResponse).then(res => {
                if (res.token) {
                    localStorage.setItem('user', JSON.stringify(res))
                }
                return res;
            })
}

function loginVersion2(username, password) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: {'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})        
    }
    return fetch(`${process.env.apiUrlVersion2}/login`,
            requestOptions).then(handleResponseVersion2).then(res => {
                if (res.data) {
                    localStorage.setItem('user', JSON.stringify(res))
                }
                return res;
            })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function handleResponseVersion2(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        console.log(data)
        console.log(response);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}