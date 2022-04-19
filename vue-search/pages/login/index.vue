<template>
  <div class="font-sans">
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gradient-to-r from-gray-300 to-gray-700">
      <div class="relative sm:max-w-sm w-full">
        <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow drop-shadow border-gray-100 border-2">
          <label for="" class="block mt-3 text-gray-700 text-center font-semibold"> Đăng nhập </label>
          <form novalidate="" action="#" class="mt-10 ng-untouched ng-pristine ng-valid">
            <div>
              <!-- <input name="username" placeholder="Tên đăng nhập" type="text" class="mt-1 block w-full border-gray-300 bg-gray-100 h-11 rounded-xl shadow-xl focus:ring-0 focus:border-green-600 ng-untouched ng-pristine ng-valid" v-model="username"> -->
              <el-input placeholder="Tên đăng nhập" v-model="username" type="text"></el-input>
            </div>
            <div class="mt-7">
              <!-- <input name="password" placeholder="Mật khẩu" type="password" class="mt-1 block w-full border-gray-300 bg-gray-100 h-11 rounded-xl shadow-xl focus:ring-0 focus:border-green-600 ng-untouched ng-pristine ng-valid" v-model="password"> -->
              <el-input @keyup.enter.native="handleSubmit" placeholder="Mật khẩu" v-model="password" type="password"></el-input>
            </div>
            <div class="mt-7" style="text-align: center">
              <!-- <button class="bg-gray-600 lg:hover:bg-gray-900 w-full py-3 rounded-3xl text-white shadow-xl lg:hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform lg:hover:-translate-x lg:hover:scale-105"> Đăng nhập </button> -->
              <el-button @click="handleSubmit"  type="info" round>Đăng nhập</el-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data: function() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['login', 'loginVersion2']),
        handleSubmit: function() {
            this.loginVersion2({username: this.username, password: this.password});
        }
    }
}
</script>
