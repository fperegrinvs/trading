import { attachmentService } from "../_services/attachment.service";

const state = {
    status: '',
}

const actions = {
    deleteAttachment({commit}, {attachment, id}) {
        commit('deleteAttachment');
        attachmentService.deleteAttachment(attachment, id).then(
            res => commit('deleteAttachmentSuccess', res),
            error => commit('deleteAttachmentFailure', {error: error.toString()})
        )
    },
    addAttachment({commit}, {documentId, attachments}) {
        commit('addAttachment');
        attachmentService.addAttachment(documentId, attachments).then(
            res => commit('addAttachmentSuccess', res),
            error => commit('addAttachmentFailure', {error: error.toString()})
        )
    },
}

const mutations = {
    deleteAttachment(state) {
        state.status = "deleteAttachmentLoading";
    },
    deleteAttachmentSuccess(state, res) {
        state.status = "deleteAttachmentSuccess";
    },
    deleteAttachmentFailure(state, error) {
        state.status = "deleteAttachmentFailure";
        state.error = error
    },
    addAttachment(state) {
        state.status = "addAttachmentLoading";
    },
    addAttachmentSuccess(state, res) {
        state.status = "addAttachmentSuccess";
    },
    addAttachmentFailure(state, error) {
        state.status = "addAttachmentFailure";
        state.error = error
    },
}

export const attachment = {
    namespaced: true,
    state,
    actions,
    mutations
}