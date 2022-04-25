import { searchServiceVersion2 } from "../_services/search-version-2.service"

const state = {
    status: '',
    data: [],
    error: '',
    response: '',
    docsSimilar: {},
    currentDoc: {},
    prop: {},
    propValue: {},
    propSigner: {},
    propPublisherName: {},
    propDocumentType: {},
    currentPdfUrl: '',
    currentDocUrl: '',
    currentSeries: [],
    currentChartOptions: {},
    currentSeriesNK: [],
    currentChartOptionsNK: {},
    tempListWordSegmentation: [],
    currentSearchSaved: '',
    currentTimeSearch: 0,

}

const actions = {
    setCurrentTimeSearch({commit}, data) {
        commit('setCurrentTimeSearch', data)
    },
    setCurrentSearchSaved({commit}, data) {
        commit('setCurrentSearchSaved', data)
    },
    setTempListWordSegmentation({commit}, data) {
        commit('setTempListWordSegmentation', data)
    },
    setCurrentChartOptionsNK({commit}, data) {
        commit('setCurrentChartOptionsNK', data)
    },
    setCurrentSeriesNK({commit}, data) {
        commit('setCurrentSeriesNK', data)
    },
    setCurrentChartOptions({commit}, data) {
        commit('setCurrentChartOptions', data)
    },
    setCurrentSeries({commit}, data) {
        commit('setCurrentSeries', data)
    },
    setCurrentDocUrl({commit}, url) {
        commit('setCurrentDocUrl', url)
    },
    setCurrentPdfUrl({commit}, url) {
        commit('setCurrentPdfUrl', url);
    },
    postSearch({commit}, request) {
        commit('postSearch');
        searchServiceVersion2.post(request.by_title, request.page, request.size, request.text).then(
            data => commit('postSearchSuccess', data),
            error => commit('postSearchFailure', {error: error.toString()})
        );
    },
    getDocsSimilarityGivenDocId({commit}, request) {
        commit('getDocsSimilarityGivenDocId');
        searchServiceVersion2.getDocsSimilarOfDoc(request.size, request.doc_id).then(
            data => commit("getDocsSimilarityGivenDocIdSuccess", data),
            error => commit('getDocsSimilarityGivenDocIdFailure', {error: error.toString()})
        )
    },
    getDoc({commit}, id) {
        commit('getDoc');
        searchServiceVersion2.getDoc(id).then(
            data => commit("getDocSuccess", data),
            error => commit('getDocFailure', {error: error.toString()})
        )
    },
    getProp({commit}) {
        commit('getProp');
        searchServiceVersion2.getSearchProp().then(
            data => commit("getPropSuccess", data),
            error => commit('getPropFailure', {error: error.toString()})
        )
    },
    postProp({commit}, request) {
        commit('postProp');
        searchServiceVersion2.postSearchProp(request.code, request.description, request.searchable, request.data_type).then(
            data => commit("postPropSuccess", data),
            error => commit('postPropFailure', {error: error.toString()})
        )
    },
    putProp({commit}, request) {
        commit('putProp');
        searchServiceVersion2.putSearchProp(request.code, request.description, request.searchable).then(
            data => commit("postPropSuccess", data),
            error => commit('postPropFailure', {error: error.toString()})
        )
    },
    getPropValue({commit}, prop_id) {
        commit('getPropValue');
        if (prop_id == 1) {
            searchServiceVersion2.getSearchPropValue(prop_id).then(
                data => commit("getPropSignerValueSuccess", data),
                error => commit('getPropSignerValueFailure', {error: error.toString()})
            )
        }
        else if (prop_id == 2) {
            searchServiceVersion2.getSearchPropValue(prop_id).then(
                data => commit("getPropPublisherNameValueSuccess", data),
                error => commit('getPropPublisherNameValueFailure', {error: error.toString()})
            )
        }
        else if (prop_id == 3) {
            searchServiceVersion2.getSearchPropValue(prop_id).then(
                data => commit("getPropDocumentTypeValueSuccess", data),
                error => commit('getPropDocumentTypeValueFailure', {error: error.toString()})
            )
        }
        // searchServiceVersion2.getSearchPropValue(prop_id).then(
        //     data => commit("getPropValueSuccess", data),
        //     error => commit('getPropValueFailure', {error: error.toString()})
        // )
    },
}

const mutations = {
    setCurrentTimeSearch(state, data) {
        state.status = 'setCurrentTimeSearch';
        state.currentTimeSearch = data
    },
    setCurrentSearchSaved(state, data) {
        state.status = 'setCurrentSearchSaved';
        state.currentSearchSaved = data
    },
    setTempListWordSegmentation(state, data) {
        state.status = 'setTempListWordSegmentation';
        let tempList = []
        data.forEach(ele => {
            tempList.push(ele.toLowerCase())
        })
        state.tempListWordSegmentation = tempList;
    },
    setCurrentSeriesNK(state, data) {
        state.status = 'setCurrentSeriesNK';
        state.currentSeriesNK = data;
    },
    setCurrentChartOptionsNK(state, data) {
        state.status = 'setCurrentChartOptionsNK';
        state.currentChartOptionsNK = data;
    },
    setCurrentSeries(state, data) {
        state.status = 'setCurrentSeries';
        state.currentSeries = data;
    },
    setCurrentChartOptions(state, data) {
        state.status = 'setCurrentChartOptions';
        state.currentChartOptions = data;
    },
    setCurrentDocUrl(state, url) {
        state.status = 'setCurrentDocUrl';
        state.currentDocUrl = url;
    },
    setCurrentPdfUrl(state, url) {
        state.status = 'setCurrentPdfUrl';
        state.currentPdfUrl = url;
    },
    postSearch(state) {
        state.status = 'postSearch';
    },
    postSearchSuccess(state, data) {
        state.status = 'postSearchSuccess';
        state.data = data;
    },
    postSearchFailure(state, error) {
        state.status = 'postSearchFailure';
        state.error = error;
    },
    getDocsSimilarityGivenDocId(state) {
        state.status = 'getDocsSimilarityGivenDocId';
    },
    getDocsSimilarityGivenDocIdSuccess(state, data) {
        state.status = 'getDocsSimilarityGivenDocIdSuccess';
        state.docsSimilar = data;
    },
    getDocsSimilarityGivenDocIdFailure(state, error) {
        state.status = 'getDocsSimilarityGivenDocIdFailure';
        state.error = error;
    },
    getDoc(state) {
        state.status = 'getDoc';
    },
    getDocSuccess(state, data) {
        state.status = 'getDocSuccess';
        state.currentDoc = data;
    },
    getDocFailure(state, error) {
        state.status = 'getDocFailure';
        state.error = error;
    },
    getProp(state) {
        state.status = 'getProp';
    },
    getPropSuccess(state, data) {
        state.status = 'getPropSuccess';
        state.prop = data;
    },
    getPropFailure(state, error) {
        state.status = 'getPropFailure';
        state.error = error;
    },
    postProp(state) {
        state.status = 'postProp';
    },
    postPropSuccess(state, data) {
        state.status = 'postPropSuccess';
        state.response = data;
    },
    postPropFailure(state, error) {
        state.status = 'postPropFailure';
        state.error = error;
    },
    putProp(state) {
        state.status = 'putProp';
    },
    putPropSuccess(state, data) {
        state.status = 'putPropSuccess';
        state.response = data;
    },
    putPropFailure(state, error) {
        state.status = 'putPropFailure';
        state.error = error;
    },
    getPropValue(state) {
        state.status = 'getPropValue';
    },
    getPropValueSuccess(state, data) {
        state.status = 'getPropValueSuccess';
        state.propValue = data;
    },
    getPropValueFailure(state, error) {
        state.status = 'getPropValueFailure';
        state.error = error;
    },
    getPropSignerValueSuccess(state, data) {
        state.status = 'getPropSignerValueSuccess';
        state.propSigner = data;
    },
    getPropSignerValueFailure(state, error) {
        state.status = 'getPropSignerValueFailure';
        state.error = error;
    },
    getPropPublisherNameValueSuccess(state, data) {
        state.status = 'getPropPublisherNameValueSuccess';
        state.propPublisherName = data;
    },
    getPropPublisherNameValueFailure(state, error) {
        state.status = 'getPropPublisherNameValueFailure';
        state.error = error;
    },
    getPropDocumentTypeValueSuccess(state, data) {
        state.status = 'getPropDocumentTypeValueSuccess';
        state.propDocumentType = data;
    },
    getPropDocumentTypeValueFailure(state, error) {
        state.status = 'getPropDocumentTypeValueFailure';
        state.error = error;
    },
}

export const searchNewVersion = {
    namespaced: true,
    state,
    actions,
    mutations
}