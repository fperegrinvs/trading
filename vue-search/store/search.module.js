import { searchService } from "../_services/search.service";

const state = {
    donViBanHanh: {},
    loaiTaiLieu: {},
    nguoiKyHienThiOTrangChinh: {},
    chuDe: {},
    nhan: {},
    thucTheTen: {},
    danhSachTimKiem: {},
    thuocTinhBang: {},
    listFavorite: [],
    flag: false,
    searchFromDetail: '',



    status: {},
    error: {},









    loaiTaiLieu2: {},
    nguoiKy: {},
    noiBanHanh: {},
    ngayBanHanh: {}
}

const actions = {
    setSearchFromDetail({commit}, value) {
        // console.log(value);
        commit('setSearchFromDetail', value);
    },
    getCategory({commit}, {level1, showall, limit}) {
        commit('getCategory');
        switch (level1) {
            case 2:
                searchService.getCategory(level1, showall, limit)
                    .then(
                        data => commit('layDonViBanHanhThanhCong', data),
                        error => commit('layDonViBanHanhThatBai', { error: error.toString() })
                    )
                break;
            case 0:
                searchService.getCategory(level1, showall, limit)
                    .then(
                        data => commit('layLoaiTaiLieuThanhCong', data),
                        error => commit('layLoaiTaiLieuThatBai', { error: error.toString() })
                    )
                break;
            case 1:
                searchService.getCategory(level1, showall, limit)
                    .then(
                        data => commit('layNguoiKyHienThiOTrangChinhThanhCong', data),
                        error => commit('layNguoiKyHienThiOTrangChinhThatBai', { error: error.toString() })
                    )
                break;
            case 9:
                searchService.getCategory(level1, showall, limit)
                    .then(
                        data => commit('layNhanThanhCong', data),
                        error => commit('layNhanThatBai', { error: error.toString() })
                    )
                break;
            case 3:
                searchService.getCategory(level1, showall, limit)
                    .then(
                        data => commit('layChuDeThanhCong', data),
                        error => commit('layChuDeThatBai', { error: error.toString() })
                    )
                break;
            case 4:
                searchService.getCategory(level1, showall, limit)
                    .then(
                        data => commit('layThucTheTenThanhCong', data),
                        error => commit('layThucTheTenThatBai', { error: error.toString() })
                    )
                break;
            default:
                break;
        }        
    },
    getStat({commit}, {type, limit}) {
        commit('getStat');
        switch (type) {
            case 0:
                searchService.getStat(type, limit)
                    .then(
                        data => commit('layLoaiTaiLieu2ThanhCong', data),
                        error => commit('layLoaiTaiLieu2ThatBai', { error: error.toString() })
                    )
                break;
            case 1:
                searchService.getStat(type, limit)
                    .then(
                        data => commit('layNguoiKyThanhCong', data),
                        error => commit('layNguoiKyThatBai', { error: error.toString() })
                    )
                break;
            case 2:
                searchService.getStat(type, limit)
                    .then(
                        data => commit('layNoiBanHanhThanhCong', data),
                        error => commit('layNoiBanHanhThatBai', { error: error.toString() })
                    )
                break;
            case 5:
                searchService.getStat(type, limit)
                    .then(
                        data => commit('layNgayBanHanhThanhCong', data),
                        error => commit('layNgayBanHanhThatBai', { error: error.toString() })
                    )
                break;
            default:
                break;
        }        
    },
    getSearchAPI({commit}, {text = "", page, pagesize, bookmarked, sort, sort_direction, publisherName = undefined, documentName = undefined}) {
        commit('getSearchAPI');
        // if (text == "") {
        //     this.flag = false;
        // }
        // else {
        //     this.flag = true;
        // }
        // console.log(text);
        // console.log(this.flag);
        if (text != "") {
            // if (!publisherName) {
            //     searchService.getSearchAPI(text, page, pagesize, bookmarked, sort, sort_direction)
            //     .then(
            //         data => commit('getSearchAPISuccessVersion2', data),
            //         error => commit('getSearchAPIFailureVersion2', {error: error.toString()})
            //     )
            // }
            // else {
                searchService.getSearchAPI(text, page, pagesize, bookmarked, sort, sort_direction, publisherName, documentName)
                .then(
                    data => commit('getSearchAPISuccessVersion2', data),
                    error => commit('getSearchAPIFailureVersion2', {error: error.toString()})
                )
            // }
        }
        else {
            // if (!publisherName) {
            //     searchService.getSearchAPI(text, page, pagesize, bookmarked, sort, sort_direction)
            //     .then(
            //         data => commit('getSearchAPISuccess', data),
            //         error => commit('getSearchAPIFailure', {error: error.toString()})
            //     )
            // }
            // else {
                searchService.getSearchAPI(text, page, pagesize, bookmarked, sort, sort_direction, publisherName, documentName)
                .then(
                    data => commit('getSearchAPISuccess', data),
                    error => commit('getSearchAPIFailure', {error: error.toString()})
                )
            // }
        }
    },
    getSearchProps({commit}) {
        commit('getSearchProps');
        searchService.getProps()
            .then(
                data => commit('getSearchPropsSuccess', data),
                error => commit('getSearchPropsFailure', { error: error.toString() })
            )
    },
    postFavorite({commit}, id) {
        commit('postFavorite');
        searchService.postFavorite(id)
            .then(
                data => commit('postFavoriteSuccess'),
                error => commit('postFavoriteFailure', { error: error.toString() })
            )
    },
    deleteFavorite({commit}, id) {
        commit('deleteFavorite');
        searchService.deleteFavorite(id)
            .then(
                data => commit('deleteFavoriteSuccess'),
                error => commit('deleteFavoriteFailure', { error: error.toString() })
            )
    },
    getFavorite({commit}) {
        commit('getFavorite');
        searchService.getFavorite()
            .then(
                data => commit('getFavoriteSuccess', data),
                error => commit('getFavoriteFailure', { error: error.toString() })
            )
    },
    postTag({commit}, {tag, docId}) {
        commit('postTag');
        searchService.postTag(tag, docId)
            .then(
                res => commit('postTagSuccess', res),
                error => commit('postTagFailure', { error: error.toString() })
            )
    },
    deleteTag({commit}, {tag, docId}) {
        commit('deleteTag');
        searchService.deleteTag(tag, docId)
            .then(
                res => commit('deleteTagSuccess', res),
                error => commit('deleteTagFailure', { error: error.toString() })
            )
    },
}

const mutations = {
    setSearchFromDetail(state, value) {
        state.searchFromDetail = value;
    },
    getCategory(state) {
        state.status = "getCategoryLoading";
    },
    layDonViBanHanhThanhCong(state, data) {
        state.status = "layDonViBanHanhThanhCong";
        state.donViBanHanh = data
    },
    layDonViBanHanhThatBai(state, error) {
        state.status = "layDonViBanHanhThatBai";
        state.error = error
    },
    layLoaiTaiLieuThanhCong(state, data) {
        state.status = "layLoaiTaiLieuThanhCong";
        state.loaiTaiLieu = data
    },
    layLoaiTaiLieuThatBai(state, error) {
        state.status = "layLoaiTaiLieuThatBai";
        state.error = error
    },
    layNguoiKyHienThiOTrangChinhThanhCong(state, data) {
        state.status = "layNguoiKyHienThiOTrangChinhThanhCong";
        state.nguoiKyHienThiOTrangChinh = data
    },
    layNguoiKyHienThiOTrangChinhThatBai(state, error) {
        state.status = "layNguoiKyHienThiOTrangChinhThatBai";
        state.error = error
    },
    layNhanThanhCong(state, data) {
        state.status = "layNhanThanhCong";
        state.nhan = data
    },
    layNhanThatBai(state, error) {
        state.status = "layNhanThatBai";
        state.error = error
    },
    layChuDeThanhCong(state, data) {
        state.status = "layChuDeThanhCong";
        state.chuDe = data
    },
    layChuDeThatBai(state, error) {
        state.status = "layChuDeThatBai";
        state.error = error
    },
    layThucTheTenThanhCong(state, data) {
        state.status = "layThucTheTenThanhCong";
        state.thucTheTen = data
    },
    layThucTheTenThatBai(state, error) {
        state.status = "layThucTheTenThatBai";
        state.error = error
    },
    getStat(state) {
        state.status = "getStatLoading";
    },
    layLoaiTaiLieu2ThanhCong(state, data) {
        state.status = "layLoaiTaiLieu2ThanhCong";
        state.loaiTaiLieu2 = data
    },
    layLoaiTaiLieu2ThatBai(state, error) {
        state.status = "layLoaiTaiLieu2ThatBai";
        state.error = error
    },
    layNguoiKyThanhCong(state, data) {
        state.status = "layNguoiKyThanhCong";
        state.nguoiKy = data
    },
    layNguoiKyThatBai(state, error) {
        state.status = "layNguoiKyThatBai";
        state.error = error
    },
    layNoiBanHanhThanhCong(state, data) {
        state.status = "layNoiBanHanhThanhCong";
        state.noiBanHanh = data
    },
    layNoiBanHanhThatBai(state, error) {
        state.status = "layNoiBanHanhThatBai";
        state.error = error
    },
    layNgayBanHanhThanhCong(state, data) {
        state.status = "layNgayBanHanhThanhCong";
        state.ngayBanHanh = data
    },
    layNgayBanHanhThatBai(state, error) {
        state.status = "layNgayBanHanhThatBai";
        state.error = error
    },
    getSearchAPI(state) {
        state.status = "getSearchAPILoading";
    },
    getSearchAPISuccess(state, data) {
        state.status = "getSearchAPISuccess";
        state.danhSachTimKiem = data;
        state.flag = false;
    },
    getSearchAPIFailure(state, error) {
        state.status = "getSearchAPIFailure";
        state.error = error
    },
    getSearchAPISuccessVersion2(state, data) {
        state.status = "getSearchAPISuccess";
        state.danhSachTimKiem = data;
        state.flag = true;
    },
    getSearchAPIFailureVersion2(state, error) {
        state.status = "getSearchAPIFailure";
        state.error = error;
    },
    getSearchProps(state) {
        state.status = "getSearchProps";
    },
    getSearchPropsSuccess(state, data) {
        state.status = "getSearchPropsSuccess";
        state.thuocTinhBang = data
    },
    getSearchPropsFailure(state, error) {
        state.status = "getSearchPropsFailure";
        state.error = error
    },
    postFavorite(state) {
        state.status = "postFavorite";
    },
    postFavoriteSuccess(state, data) {
        state.status = "postFavoriteSuccess";
    },
    postFavoriteFailure(state, error) {
        state.status = "postFavoriteFailure";
        state.error = error
    },
    deleteFavorite(state) {
        state.status = "deleteFavorite";
    },
    deleteFavoriteSuccess(state, data) {
        state.status = "deleteFavoriteSuccess";
    },
    deleteFavoriteFailure(state, error) {
        state.status = "deleteFavoriteFailure";
        state.error = error
    },
    getFavorite(state) {
        state.status = "getFavorite";
    },
    getFavoriteSuccess(state, data) {
        state.status = "getFavoriteSuccess";
        state.listFavorite = data;
    },
    getFavoriteFailure(state, error) {
        state.status = "getFavoriteFailure";
        state.error = error
    },
    postTag(state) {
        state.status = "postTagLoading";
    },
    postTagSuccess(state, res) {
        state.status = "postTagSuccess";
    },
    postTagFailure(state, error) {
        state.status = "postTagFailure";
        state.error = error
    },
    deleteTag(state) {
        state.status = "deleteTagLoading";
    },
    deleteTagSuccess(state, res) {
        state.status = "deleteTagSuccess";
    },
    deleteTagFailure(state, error) {
        state.status = "deleteTagFailure";
        state.error = error
    },
}

export const search = {
    namespaced: true,
    state,
    actions,
    mutations
}