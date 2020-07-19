// 页面组件
// 路由懒加载
// 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

// import Home from '@/pages/Home'
// import Mall from '@/pages/Mall'
// import Cart from '@/pages/Cart'
// import Detail from '@/pages/Detail'
// import ProductList from '@/pages/ProductList'
// import Mine from '@/pages/Mine'

// 组件
// 只是一个小组件，就没必要做分片打包了，因为分片打包会增加http请求
import Tabbar from '@/components/Tabbar'
import AppHeader from '@/components/AppHeader'

// 结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。
// 一般来说，页面级别的组件，才会去做懒加载，分片打包
const Home = () => import('@/pages/Home')
const Mall = () => import('@/pages/Mall')
const Cart = () => import('@/pages/Cart')
const Detail = () => import('@/pages/Detail')
const ProductList = () => import('@/pages/ProductList')
const Mine = () => import('@/pages/Mine')
const Login = () => import('@/pages/Login')
// 只是一个小组件，就没必要做分片打包了，因为分片打包会增加http请求
// const Tabbar = () => import('@/components/Tabbar')
// const AppHeader = () => import('@/components/AppHeader')

const routes = [{
  path: '/',
  meta: {
    isNav: false
  },
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  meta: {
    isNav: true,
    icon: '&#xe65a;',
    title: '首页'
  },
  components: {
    default: Home,
    header: AppHeader,
    tabbar: Tabbar
  }
}, {
  path: '/mall',
  name: 'mall',
  children: [{
    path: ':cateID',
    name: 'productList',
    components: {
      default: ProductList
    }
  }],
  meta: {
    isNav: true,
    icon: '&#xe663;',
    title: '商城'
  },
  components: {
    default: Mall,
    header: AppHeader,
    tabbar: Tabbar
  }
}, {
  path: '/cart',
  name: 'cart',
  meta: {
    isNav: true,
    icon: '&#xe658;',
    title: '购物车',
    isAuthRequired: true
  },
  components: {
    default: Cart,
    header: AppHeader,
    tabbar: Tabbar
  }
}, {
  path: '/mine',
  name: 'mine',
  meta: {
    isNav: true,
    icon: '&#xe65d;',
    title: '我的'
  },
  components: {
    default: Mine,
    header: AppHeader,
    tabbar: Tabbar
  }
}, {
  path: '/detail/:id',
  name: 'detail',
  meta: {
    isNav: false,
    isShowBack: true
  },
  components: {
    default: Detail,
    header: AppHeader
  }
}, {
  path: '/login',
  name: 'login',
  meta: {
    isNav: false
  },
  components: {
    default: Login
  }
}]

export default routes
