import { authHeader } from '../_helpers'

export const attachmentService = {
    deleteAttachment,
    addAttachment,
}

function deleteAttachment(attachment, id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader().Authorization,
        },
        body: JSON.stringify({ attachment: attachment, documentId: id })
    }
    return fetch(`${process.env.apiUrl}/attachment`,
            requestOptions).then(handleResponse)
}

function addAttachment(documentId, attachments) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader().Authorization,
        },
        body: JSON.stringify({ documentId: documentId, attachments: attachments })
    }
    return fetch(`${process.env.apiUrl}/attachment`,
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
