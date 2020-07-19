<template>
  <div class="home">
    <div class="rzg-swiper-home swiper-container">
      <div v-if="hasSwiperLoaded" class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="item in swiper"
          :key="item.id">
          <img :src="item.img" :alt="item.title">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'
export default {
  name: 'Home',
  data () {
    return {
      swiper: []
    }
  },
  computed: {
    hasSwiperLoaded () {
      return this.swiper.length > 0
    }
  },
  created () {
    this.$http.getSwiper()
      .then(resp => {
        this.swiper = resp
        // 在这时，实际上dom还没有更新渲染完成, 所以这里初始化Swiper会有问题，因为个数不对
        // this.initSwiper()
        // $nextTick 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        // this.$nextTick(this.initSwiper)
        this.$nextTick()
          .then(this.initSwiper) // 在DOM更新之后再去初始化
      })
  },
  mounted () {
    // 在这时，实际上dom还没有更新渲染完成, 所以这里初始化Swiper会有问题，因为个数不对
    // this.initSwiper()
  },
  methods: {
    initSwiper () {
      this.mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
}
</script>
<style>
.swiper-pagination-bullet {
  background: #e00;
}
</style>

<style lang="scss" scoped>
  .rzg-swiper-home {
    width: 100%;
    height: 0;
    padding-top: percentage( 400 / 1080 );
    position: relative;
    background: #600;
    .swiper-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      img {
        max-width: 100%;
      }
    }
  }
</style>
