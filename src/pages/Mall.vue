<template>
  <div class="mall">
    <div class="cate-list">
      <router-link
        tag="div"
        class="cate-list-item"
        v-for="item in cateNav"
        :key="item.id"
        :to="`/mall/${item.id}`"
        @click.native="handleRouterLinkClick(item.txt)"
      >{{item.txt}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
const SESSION_STORAGE_KEY = 'rzg-mall-cate-nav'
export default {
  name: 'Mall',
  data () {
    return {
      cateNav: []
    }
  },
  methods: {
    handleRouterLinkClick (title) {
      console.log(title)
      this.$store.commit('changePageTitle', title)
    }
  },
  // watch: {
  //   $route () {
  //     console.log(this.cateNav)
  //     const title = this.cateNav.filter(item => item.id.toString() === this.$route.params.cateID)[0].txt
  //     this.$store.commit('changePageTitle', title)
  //   }
  // },
  activated () {
    const cateNav = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY))
    if (cateNav) {
      this.cateNav = cateNav
      const {
        cateID = cateNav[0].id
      } = this.$route.params
      const title = cateNav.filter(item => `${item.id}` === `${cateID}`)[0].txt
      this.handleRouterLinkClick(title)
      this.$router.push({
        name: 'productList',
        params: {
          cateID
        }
      })
    } else {
      this.$http.getCateNav()
        .then(resp => {
          // 因为已经在拦截器里做了处理了，所以这里的resp就直接是咱们想要的值，最好打印出来看看吧！
          this.cateNav = resp
          window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(resp))
          // 等导航渲染完成之后，再跳转到第一个
          this.$nextTick(() => {
            // L36-L38的代码相当于L32-L35
            // let cateID = resp[0].id
            // if (this.$route.params.cateID) {
            //   cateID = this.$route.params.cateID
            // }
            const {
              cateID = resp[0].id // 默认值
            } = this.$route.params // 解构赋值

            const title = resp.filter(item => `${item.id}` === `${cateID}`)[0].txt
            this.handleRouterLinkClick(title)
            // this.$router.push(`/mall/${cateID}`)
            this.$router.push({
              name: 'productList',
              params: {
                cateID
              }
            })
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.mall {
  display: flex;
  height: 100%;

  .cate-list {
    width: 96px;
    padding-top: 10px;
    &-item {
      padding: 10px;
      border-left: 5px solid transparent;
      border-bottom: 1px solid #fff;
      color: #666;

      &.router-link-exact-active.router-link-active {
        color: #e00;
        border-left-color: #e00;
      }
    }
  }

  .product-list {
    flex: 1;
    background-color: #fff;
  }
}
</style>
