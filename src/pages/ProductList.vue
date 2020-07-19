<template>
  <div class="product-list">
    <div
      class="product"
      v-for="item in list"
      :key="item.id"
      @touchstart="toDetail(item.id)"
    >
      <div class="product-img">
        <img :src="item.img" :alt="item.title">
      </div>
      <div class="product-title">
        {{item.title}}
      </div>
      <div class="product-price">
        ￥{{item.price}}
      </div>
      <div class="product-actions">
        <!-- 注意，这里的stop只能阻止相同的事件冒泡 -->
        <!-- <mt-button
          type="primary"
          size="small"
          @click.stop="addToCart"
        >加入购物车</mt-button> -->
        <!-- 因为组件 mt-button不是原生的html标签，所以需要加上 .native修饰符 -->
        <mt-button
          type="primary"
          size="small"
          @touchstart.native.stop="addToCart(item)"
        >加入购物车</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapMutations
} from 'vuex'
const SESSION_STORAGE_KEY = 'rzg-mall-list'
export default {
  name: 'ProductList',
  data () {
    return {
      list: []
    }
  },
  // 由于当前组件是动态路由渲染的组件
  // 当路由参数发生改变的时候，这个组件不会去执行销毁之再创建
  // 所以，created只会执行一次，那如果路由发生改变的时候，就不会重新请求数据
  // 要重新请求数据，就需要用watch去监听 $route的变化, 并且在这个方法里要再次请求数据
  // created () {
  //   this.getData(this.$route.params.cateID)
  // },
  // watch: {
  //   $route () {
  //     this.getData(this.$route.params.cateID)
  //   }
  // },

  // 第二种做法，也可以直接使用组件内的导航守卫
  beforeRouteEnter (to, from, next) {
    // 由于beforeRouteEnter这个方法没有this, 所以需要在next里传递一个回调，这个回调有一个参数vm, 把vm当成this来用就行
    next(vm => {
      vm.getData(to.params.cateID)
    })
  },
  // beforeRouteEnter只会执行一次，所以需要在beforeRouteUpdate里再次请求数据，这样才能确保路由切换的时候，数据能正常更新
  beforeRouteUpdate (to, from, next) {
    this.getData(to.params.cateID)
    next()
  },
  methods: {
    ...mapMutations(['addToCart']),
    toDetail (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    },
    getData (cateID) {
      // 会话级别的缓存，由于这个只是当前会话有效，所以用sessionStorage来存储
      const cacheList = JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEY)) || {}
      // 这里有一个小坑，ID由于是mock数据类型！而且是数字，JSON的key是字符串类型，所以需要toString
      if (Object.keys(cacheList).includes(cateID.toString())) {
        // 如果缓存里有数据，就从缓存里取
        this.list = cacheList[cateID]
      } else {
        // 如果缓存里没有数据，再请求接口
        this.$http.getProductList(cateID)
          .then(resp => {
            this.list = resp // 渲染页面用的数据

            cacheList[cateID] = resp // 缓存用的数据
            window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cacheList)) // 同步缓存
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-list {
    height: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    // justify-content: space-around;
  }
  .product {
    width: 50%;
    padding: 15px;
    font-size: 14px;
    box-sizing: border-box;

    &-img {
      width: 100%;
      height: 0;
      padding-top: 120%;
      background-color: #dedede;
      position: relative;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    &-title {
      padding: 5px 0;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-actions {
      padding: 5px 0 0;

      .mint-button--small {
        font-size: 12px;
      }
    }
  }
</style>
