export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export function authHeaderVersion2() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.data) {
        return { 'Authorization': 'Bearer ' + user.data };
    } else {
        return {};
    }
}