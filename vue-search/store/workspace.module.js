import { workspaceService } from "../_services/workspace.service";

const state = {
    status: '',
    workspace: [],
    error: '',
    response: '',
}

const actions = {
    getWorkspace({commit}) {
        commit('getWorkspace');
        workspaceService.get().then(
            data => commit('getWorkspaceSuccess', data),
            error => commit('getWorkspaceFailure', {error: error.toString()})
        )
    },
}

const mutations = {
    getWorkspace(state) {
        state.status = 'getWorkspace';
    },
    getWorkspaceSuccess(state, data) {
        state.status = 'getWorkspaceSuccess';
        state.workspace = data;
    },
    getWorkspaceFailure(state, error) {
        state.status = 'getWorkspaceFailure';
        state.error = error;
    },
}

export const workspace = {
    namespaced: true,
    state,
    actions,
    mutations
}