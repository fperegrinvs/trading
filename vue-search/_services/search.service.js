import { authHeader } from '../_helpers'

export const searchService = {
    getCategory,
    getStat,
    getSearchAPI,
    getProps,
    postFavorite,
    deleteFavorite,
    getFavorite,
    postTag,
    deleteTag,
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

function getProps() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${process.env.apiUrl}/searchapi/props`,
            requestOptions).then(handleResponse)
}

function postTag(tag, docId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader().Authorization,

        },
        body: JSON.stringify({ tags: tag, document_id: docId })
    }
    return fetch(`${process.env.apiUrl}/searchapi/tagging`,
            requestOptions).then(handleResponse)
}

function deleteTag(tag, docId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader().Authorization,

        },
        body: JSON.stringify({ tags: tag, document_id: docId })
    }
    return fetch(`${process.env.apiUrl}/searchapi/tagging`,
            requestOptions).then(handleResponse)
}

function postFavorite(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    }
    return fetch(`${process.env.apiUrl}/searchapi/favorite?document_id=${id}`,
            requestOptions).then(handleResponse)
}

function deleteFavorite(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    }
    return fetch(`${process.env.apiUrl}/searchapi/favorite?document_id=${id}`,
            requestOptions).then(handleResponse)
}

function getFavorite() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${process.env.apiUrl}/searchapi/favorite`,
            requestOptions).then(handleResponse)
}

function getSearchAPI(text, page, pagesize, bookmarked, sort, sort_direction) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader().Authorization,

        },
        body: JSON.stringify({ text: text, page: page, pagesize: pagesize, bookmarked: bookmarked, sort: sort, sort_direction: sort_direction })
    }
    if (text != "") {
        // console.log('abcdcddccd')
        return fetch(`${process.env.apiUrl}/searchapi`,
            requestOptions).then(handleResponseVersion2) 
    }
    return fetch(`${process.env.apiUrl}/searchapi`,
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

function handleResponseVersion2(response) {
    // console.log('hd2')
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log(data);
        if (!response.ok) {
            console.log('no ok')            
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            console.log('???')
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        const tempData = text && JSON.parse(text);
        // console.log(tempData);
        let tempNewData = tempData;
        // console.log(tempData['hits'])
        let tempHits = []
        tempData['hits'].map(ele => {
            console.log('inside map')
            // tempHits.push(ele);
            // tempHits.push({});
            let tempEle = {...ele};
            tempEle['_source']['highlight'] = ele.highlight
            tempHits.push(tempEle);
        })
        tempNewData.hits = tempHits;
        // console.log(tempNewData);
        return tempNewData;
    });
}