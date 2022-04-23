import { authHeaderVersion2 } from "../_helpers"
export const searchServiceVersion2 = {
    post,
    getDocsSimilarOfDoc,
    getDoc,
    getSearchProp,
    postSearchProp,
    putSearchProp,
    getSearchPropValue
}

function post(by_title, page, size, text) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({by_title: by_title, page: page, size: size, text: text})        
    }
    return fetch(`${process.env.apiUrlVersion2}/search/`,
            requestOptions).then(handleResponse)
}

function postSearchProp(code, description, searchable, data_type) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
        },
        
        body: JSON.stringify({code, description, searchable, data_type})        
    }
    return fetch(`${process.env.apiUrlVersion2}/search/prop`,
            requestOptions).then(handleResponse)
}

function putSearchProp(code, description, searchable) {
    const requestOptions = {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
        },
        
        body: JSON.stringify({code, description, searchable})        
    }
    return fetch(`${process.env.apiUrlVersion2}/search/prop`,
            requestOptions).then(handleResponse)
}

function getSearchProp() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json',
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/search/prop`,
            requestOptions).then(handleResponse)
}

function getSearchPropValue(prop_id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json',
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/search/prop/${prop_id}/value`,
            requestOptions).then(handleResponse)
}

function getDoc(doc_id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json',
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/search/doc/${doc_id}`,
            requestOptions).then(handleResponse)
}

function getDocsSimilarOfDoc(size, doc_id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json',
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/search/doc/${doc_id}/similarity?size=${size}`,
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