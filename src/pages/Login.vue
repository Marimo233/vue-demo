<template>
  <div>
    登录页 {{isLogin}}
    <mt-button @click="login">登录</mt-button>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    isLogin () {
      // 当isLogin为true的时候，执行跳转
      const {
        from = '/home'
      } = this.$route.params
      this.$router.push(from)
    }
  },
  methods: {
    ...mapMutations(['changeLoginStatus']),
    login () {
      this.$http.postLogin()
        .then(resp => {
          if (resp.code === 200) {
            window.localStorage.setItem('rzg-token', resp.data.token)
            this.changeLoginStatus(true)
          }
        })
    }
  }
}
</script>

<style>

</style>
