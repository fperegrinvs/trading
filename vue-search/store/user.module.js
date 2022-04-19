import { userService } from "../_services/user.service";
const state = {
    status: '',
    response: '',
    error: '',
    users: []
}

const actions = {
    postUser({commit}, data) {
        commit('postUser');
        userService.post(data.username, data.password, data.name, data.is_superuser).then(
            data => commit('postUserSuccess', data),
            error => commit('postUserFailure', { error: error.toString() })
        )
    },
    getUser({commit}) {
        commit('getUser');
        userService.get().then(
            data => commit('getUserSuccess', data),
            error => commit('getUserFailure', { error: error.toString() })
        )
    },
}

const mutations = {
    postUser(state) {
        state.status = 'postUser';
    },
    postUserSuccess(state, data) {
        state.status = 'postUserSuccess';
        state.response = data;
    },
    postUserFailure(state, error) {
        state.status = 'postUserFailure';
        state.error = error;
    },
    getUser(state) {
        state.status = 'getUser';
    },
    getUserSuccess(state, data) {
        state.status = 'getUserSuccess';
        state.users = data;
    },
    getUserFailure(state, error) {
        state.status = 'getUserFailure';
        state.error = error;
    },
}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
}