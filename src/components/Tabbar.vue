<template>
  <ul class="tabbar">
    <li
      v-for="link in navs"
      :key="link.path"
      :class="{
        // 动态绑定一个class
        current: $route.fullPath.includes(link.path)
      }"
      @click="switchTab(link.path)"
    >
      <span v-if="link.path==='/cart' && totalCount > 0" class="badge">{{totalCount | formatTotalCount}}</span>
      <span class="icon" v-html="link.meta.icon" />
      <span class="text">{{link.meta.title}}</span>
    </li>
  </ul>
</template>

<script>
import routes from '@/router/routes'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'Tabbar',
  data () {
    return {
      navs: routes.filter(route => route.meta.isNav === true)
    }
  },
  methods: {
    // 手动做跳转
    switchTab (path) {
      // 如果是在当前页，就不跳转
      if (this.$route.fullPath.includes(path)) {
        return
      }
      this.$router.push(path)
    }
  },
  computed: {
    ...mapGetters(['totalCount'])
  },
  filters: {
    formatTotalCount (count) {
      return count > 99 ? '99+' : count
    }
  }
}
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'iconfont';  /* project id 998998 */
    src: url('//at.alicdn.com/t/font_998998_nh3cphbb2gj.eot');
    src: url('//at.alicdn.com/t/font_998998_nh3cphbb2gj.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_998998_nh3cphbb2gj.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_998998_nh3cphbb2gj.woff') format('woff'),
    url('//at.alicdn.com/t/font_998998_nh3cphbb2gj.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_998998_nh3cphbb2gj.svg#iconfont') format('svg');
  }
  .tabbar {
    height: 52px;
    border-top: 1px solid #dedede;
    background-color: #fff;
    display: flex;

    li {
      flex: 1;
      text-align: center;
      color: #666;
      position: relative;

      &.current {
        color: #e00;
      }

      span {
        display: block;

        &.badge {
          position: absolute;
          left: 60%;
          top: -8px;
          background-color: #e00;
          padding: 3px;
          font-size: 12px;
          height: 14px;
          line-height: 14px;
          color: #fff;
          border-radius: 10px;
          min-width: 20px;
        }
        &.icon {
          height: 32px;
          line-height: 32px;
          font-family: 'iconfont';
          font-size: 20px;
          font-weight: 900;
        }

        &.text {
          height: 20px;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
</style>
