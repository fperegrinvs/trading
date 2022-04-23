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
    putUser({commit}, data) {
        commit('putUser');
        userService.put(data.username, data.password, data.name, data.is_superuser).then(
            data => commit('putUserSuccess', data),
            error => commit('putUserFailure', { error: error.toString() })
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
    putUser(state) {
        state.status = 'putUser';
    },
    putUserSuccess(state, data) {
        state.status = 'putUserSuccess';
        state.response = data;
    },
    putUserFailure(state, error) {
        state.status = 'putUserFailure';
        state.error = error;
    },
}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
}