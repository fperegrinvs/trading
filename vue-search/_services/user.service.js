import { authHeaderVersion2 } from "../_helpers"
export const userService = {
    post,
    get,
    put
}

function post(username, password, name, is_superuser) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
        },
        
        body: JSON.stringify({username, password, name, is_superuser})        
    }
    return fetch(`${process.env.apiUrlVersion2}/management/user`,
            requestOptions).then(handleResponse)
}

function get() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json'
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/management/user`,
            requestOptions).then(handleResponse)
}

function put(username, password, name, is_superuser) {
    const requestOptions = {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
        },
        
        body: JSON.stringify({username, password, name, is_superuser})        
    }
    return fetch(`${process.env.apiUrlVersion2}/management/user`,
            requestOptions).then(handleResponse)
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