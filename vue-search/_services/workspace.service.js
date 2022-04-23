import { authHeaderVersion2 } from "../_helpers"
export const workspaceService = {
    post,
    get,
    deleteWorkspace,
    getDocsOfWorkspace,
    postDocToWokspace,
    deleteDocOfWorkspace
}

function post(name, description) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({name, description})        
    }
    return fetch(`${process.env.apiUrlVersion2}/workspace`,
            requestOptions).then(handleResponse)
}

function postDocToWokspace(id_workspace, id_doc) {
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({document_id: id_doc})        
    }
    return fetch(`${process.env.apiUrlVersion2}/workspace/${id_workspace}/document`,
            requestOptions).then(handleResponse)
}

function get() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json',
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/workspace`,
            requestOptions).then(handleResponse)
}

function getDocsOfWorkspace(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json',
        },
           
    }
    return fetch(`${process.env.apiUrlVersion2}/workspace/${id}/document`,
            requestOptions).then(handleResponse)
}

function deleteWorkspace(id) {
    const requestOptions = {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({id: id})        
    }
    return fetch(`${process.env.apiUrlVersion2}/workspace`,
            requestOptions).then(handleResponse)
}

function deleteDocOfWorkspace(workspace_id, doc_id) {
    const requestOptions = {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
        headers: {
            'Authorization': authHeaderVersion2().Authorization,
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({document_id: doc_id})        
    }
    return fetch(`${process.env.apiUrlVersion2}/workspace/${workspace_id}/document`,
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