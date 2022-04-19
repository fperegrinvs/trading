import { documentService } from "../_services/document.service";
const state = {
    currentDoc: {},
    status: '',
    docProps: {},
    error: {},
    currentDocCopyFromHTML: {},
}

const actions = {
    getDocById({commit}, id) {
        commit('getDocById');
        documentService.getDocById(id).then(
            data => commit('getDocByIdSuccess', data),
            error => commit('getDocByIdFailure', { error: error.toString() })
        )
    },
    getDocProps({commit}) {
        commit('getDocProps');
        documentService.getDocProps().then(
            data => commit('getDocPropsSuccess', data),
            error => commit('getDocPropsFailure', { error: error.toString() })
        )
    },
    setCurrentDoc({commit}, data) {
        commit('setCurrentDoc', data);        
    }
}

const mutations = {
    setCurrentDoc(state, data) {
        state.currentDocCopyFromHTML = data;
    },
    getDocById(state) {
        state.status = 'getDocByIdLoading';
    },
    getDocByIdSuccess(state, data) {
        state.status = 'getDocByIdSuccess';
        state.currentDoc = data;
    },
    getDocByIdFailure(state, error) {
        state.status = 'getDocByIdFailure';
        state.error = error;
    },
    getDocProps(state) {
        state.status = 'getDocPropsLoading';
    },
    getDocPropsSuccess(state, data) {
        state.status = 'getDocPropsSuccess';
        state.docProps = data;
    },
    getDocPropsFailure(state, error) {
        state.status = 'getDocPropsFailure';
        state.error = error;
    },
}

export const document = {
    namespaced: true,
    state,
    actions,
    mutations
}