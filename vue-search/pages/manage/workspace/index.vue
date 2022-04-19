<template>
    <Layout>
        <div>
            <div class="row">
                <div class="col-lg-12 flex flex-col">
                    <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                        <el-table-column
                        label="Date"
                        prop="date">
                        </el-table-column>
                        <el-table-column
                        label="Name"
                        prop="name">
                        </el-table-column>
                        <el-table-column
                        align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Type to search"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '../../layout/index.vue'
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
Vue.component('Layout', Layout)

export default {
    name: "manage-page",
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'John',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Morgan',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Jessy',
          address: 'No. 189, Grove St, Los Angeles'
        }],
        search: '',
      }
    },
    methods: {
      ...mapActions('user', ['postUser', 'getUser']),
      ...mapActions('workspace', ['getWorkspace']),
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted() {
      // this.getUser()
      // console.log(this.users);
      this.getWorkspace();
      // console.log(this.workspace);
    },
    computed: {
      ...mapState({
        users: state => state.user.users,
        workspace: state => state.workspace.workspace
      })
    },
  }
</script>