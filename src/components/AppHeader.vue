<template>
  <mt-header :title="pageTitle">
    <mt-button @click="toPrevPage" v-if="isShowBack" icon="back" slot="left"></mt-button>
  </mt-header>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'AppHeader',
  data () {
    return {
      backTo: '/'
    }
  },
  computed: {
    ...mapState(['pageTitle']),
    isShowBack () {
      return this.$route.meta.isShowBack
    }
  },
  methods: {
    toPrevPage () {
      this.$router.push(this.backTo)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backTo = from.fullPath
    })
  }
}
</script>

<style>
.mint-header {
  background-color: #e00;
}
</style>
