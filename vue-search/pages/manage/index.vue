<template>
    <Layout>
        <div>
            <div class="row">
                <el-button @click="dialogFormVisible = true">Add</el-button>
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
                            <!-- <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="Username" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" :label-width="formLabelWidth">
      <el-input show-password v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Name" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Is Superuser" :label-width="formLabelWidth">
      <!-- <el-input v-model="form.password" autocomplete="off"></el-input> -->
      <el-checkbox v-model="form.is_superuser"></el-checkbox>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="handleConfirmButton">Confirm</el-button>
  </span>
</el-dialog>
    </Layout>
</template>

<script>
import Layout from '../layout/index.vue'
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
Vue.component('Layout', Layout)

export default {
    name: "manage-page",
    data() {
      return {
        dialogFormVisible: false,
        form: {
          username: '',
          password: '',
          name: '',
          is_superuser: false,
        },
        formLabelWidth: '120px',
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
      },
      handleConfirmButton() {
        this.dialogFormVisible = false;
        this.postUser({username: this.form.username, password: this.form.password, name: this.form.name, is_superuser: this.form.is_superuser})
      },
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