import { searchService } from "../_services/search.service";

const state = {
    donViBanHanh: {},
    loaiTaiLieu: {},
    nguoiKyHienThiOTrangChinh: {},
    chuDe: {},
    nhan: {},
    thucTheTen: {},





    status: {},
    error: {},









    loaiTaiLieu2: {},
    nguoiKy: {},
    noiBanHanh: {},
    ngayBanHanh: {}
}

const actions = {
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
    }
}

const mutations = {
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
}

export const search = {
    namespaced: true,
    state,
    actions,
    mutations
}