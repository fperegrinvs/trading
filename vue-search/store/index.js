// export const getters = {
//     isAuthenticated(state) {
//       return state.auth.loggedIn
//     },
  
//     loggedInUser(state) {
//       return state.auth.user
//     }
// }
import Vue from 'vue';
import Vuex from 'vuex';

// import { alert } from './alert.module';
import { layout } from './layout.module'
import { account } from './account.module'
import { search } from './search.module'
import { document } from './document.module'
import { attachment } from './attachment.module'
import { user } from './user.module'
import { workspace } from './workspace.module'
import { searchNewVersion } from './search-new-version.module'

Vue.use(Vuex);

export default () => new Vuex.Store({
    state: () => ({}),
    mutations: {},
    actions: {},
    modules: {
        layout,
        account,
        search,
        document,
        attachment,
        user,
        workspace,
        searchNewVersion
    }
});