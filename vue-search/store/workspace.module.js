import { workspaceService } from "../_services/workspace.service";

const state = {
    status: '',
    workspace: {},
    error: '',
    response: '',
    currentWorkspace: {},
    docsOfWorkspace: [],
    allDocsOfAllWorkspace: [],
}

const actions = {
    getWorkspace({commit}) {
        commit('getWorkspace');
        workspaceService.get().then(
            data => commit('getWorkspaceSuccess', data),
            error => commit('getWorkspaceFailure', {error: error.toString()})
        )
    },
    postWorkspace({commit}, request) {
        commit('postWorkspace');
        workspaceService.post(request.name, request.description).then(
            data => commit('postWorkspaceSuccess', data),
            error => commit('postWorkspaceFailure', {error: error.toString()})
        )
    },
    deleteWorkspace({commit}, id) {
        commit('deleteWorkspace');
        workspaceService.deleteWorkspace(id).then(
            data => commit('deleteWorkspaceSuccess', data),
            error => commit('deleteWorkspaceFailure', {error: error.toString()})
        )
    },
    async setCurrentWorkspace({commit}, workspace) {
        await workspaceService.get().then(
            data => commit('getWorkspaceSuccess', data),
            error => commit('getWorkspaceFailure', {error: error.toString()})
        )
        commit('setCurrentWorkspace', workspace);
        
    },
    getDocsOfWorkspace({commit}, id) {
        commit('getDocsOfWorkspace');
        workspaceService.getDocsOfWorkspace(id).then(
            data => commit('getDocsOfWorkspaceSuccess', data),
            error => commit('getDocsOfWorkspaceFailure', {error: error.toString()})
        )
    },
    postDocToWorkspace({commit}, request) {
        commit('postDocToWorkspace');
        workspaceService.postDocToWokspace(request.workspace_id, request.doc_id).then(
            data => commit('postDocToWorkspaceSuccess', data),
            error => commit('postDocToWorkspaceFailure', {error: error.toString()})
        )
    },
    deleteDocOfWorkspace({commit}, request) {
        commit('deleteDocOfWorkspace');
        workspaceService.deleteDocOfWorkspace(request.workspace_id, request.doc_id).then(
            data => commit('deleteDocOfWorkspaceSuccess', data),
            error => commit('deleteDocOfWorkspaceFailure', {error: error.toString()})
        )
    },
    getAllDocsOfAllWorkspace({commit}, id) {
        commit('getAllDocsOfAllWorkspace');
        workspaceService.getDocsOfWorkspace(id).then(
            data => commit('getAllDocsOfAllWorkspaceSuccess', data),
            error => commit('getAllDocsOfAllWorkspaceFailure', {error: error.toString()})
        )
    },
}

const mutations = {
    getAllDocsOfAllWorkspaceFailure(state, error) {
        state.status = 'getAllDocsOfAllWorkspaceFailure'
        // state.allDocsOfAllWorkspace.push(data.data);
        state.error = error;
    },
    getAllDocsOfAllWorkspaceSuccess(state, data) {
        state.status = 'getAllDocsOfAllWorkspaceSuccess'
        state.allDocsOfAllWorkspace.push(data.data);
    },
    getAllDocsOfAllWorkspace(state) {
        state.status = 'getAllDocsOfAllWorkspace';
        state.allDocsOfAllWorkspace = [];
    },
    setCurrentWorkspace(state, workspace) {
        // state.currentWorkspace = workspace;
        console.log(state.workspace.data);
        state.workspace.data.forEach(ele => {
            if (ele.id == workspace.id) {
                state.currentWorkspace = ele
                console.log('true  in module');
            }
        })
        // state.currentWorkspace = state.workspace.
    },
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
    postWorkspace(state) {
        state.status = 'postWorkspace';
    },
    postWorkspaceSuccess(state, data) {
        state.status = 'postWorkspaceSuccess';
        state.response = data;
    },
    postWorkspaceFailure(state, error) {
        state.status = 'postWorkspaceFailure';
        state.error = error;
    },
    deleteWorkspace(state) {
        state.status = 'deleteWorkspace';
    },
    deleteWorkspaceSuccess(state, data) {
        state.status = 'deleteWorkspaceSuccess';
        state.response = data;
    },
    deleteWorkspaceFailure(state, error) {
        state.status = 'deleteWorkspaceFailure';
        state.error = error;
    },
    getDocsOfWorkspace(state) {
        state.status = 'getDocsOfWorkspace';
    },
    getDocsOfWorkspaceSuccess(state, data) {
        state.status = 'getDocsOfWorkspaceSuccess';
        state.docsOfWorkspace = data;
    },
    getDocsOfWorkspaceFailure(state, error) {
        state.status = 'getDocsOfWorkspaceFailure';
        state.error = error;
    },
    postDocToWorkspace(state) {
        state.status = 'postDocToWorkspace';
    },
    postDocToWorkspaceSuccess(state, data) {
        state.status = 'postDocToWorkspaceSuccess';
        state.response = data;
    },
    postDocToWorkspaceFailure(state, error) {
        state.status = 'postDocToWorkspaceFailure';
        state.error = error;
    },
    deleteDocOfWorkspace(state) {
        state.status = 'deleteDocOfWorkspace';
    },
    deleteDocOfWorkspaceSuccess(state, data) {
        state.status = 'deleteDocOfWorkspaceSuccess';
        state.response = data;
    },
    deleteDocOfWorkspaceFailure(state, error) {
        state.status = 'deleteDocOfWorkspaceFailure';
        state.error = error;
    },
}

export const workspace = {
    namespaced: true,
    state,
    actions,
    mutations
}