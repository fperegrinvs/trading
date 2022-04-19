import { accountService } from "../_services/account.service";
import { router } from '../router'

const user = JSON.parse(localStorage.getItem('user'));

const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        accountService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);

                    router.push('/home');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    loginVersion2({ dispatch, commit }, { username, password }) {
        commit('loginVersion2Request', { username });
    
        accountService.loginVersion2(username, password)
            .then(
                user => {
                    console.log(user);
                    commit('loginSuccess', user);

                    router.push('/home');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
}
const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginVersion2Request(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    }
}
export const account = {
    namespaced: true,
    state,
    actions,
    mutations
}