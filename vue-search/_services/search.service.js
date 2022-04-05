import { authHeader } from '../_helpers'

export const searchService = {
    getCategory,
    getStat
}

function getCategory(level1, showall = true, limit) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${process.env.apiUrl}/category?level1=${level1}&showall=${showall}&limit=${limit}`,
            requestOptions).then(handleResponse)
}

function getStat(type, limit) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${process.env.apiUrl}/stat?type=${type}&limit=${limit}`,
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