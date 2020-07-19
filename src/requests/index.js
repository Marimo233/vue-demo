import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

const ajax = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/123405'
})

// 拦截器
ajax.interceptors.request.use(config => {
  Indicator.open('加载中...')
  // console.log(config)
  // config.data = {
  //   ...config.data,
  //   authToken: window.localStorage.getItem('rzg-token')
  // }
  return config
})

ajax.interceptors.response.use(resp => {
  Indicator.close()
  // 这种写法必须是每个接口都统一，要不然，你就得不到正确的数据，那你就老实的返回resp
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    Toast({
      message: '网络出错了', // 实际上这里应该是后端返回的一个错误信息或者根据后端返回的错误码生成一个错误信息
      duration: 2000
    })
  }
})

// 轮播图接口
export const getSwiper = () => {
  return ajax.get('/api/v1/swiper')
}

// 分类列表菜单
export const getCateNav = () => {
  return ajax.get('/api/v1/cateNav')
}

// 产品列表
export const getProductList = (cateID) => {
  return ajax.get(`/api/v1/productList/${cateID}`)
}

// 登录
export const postLogin = (params) => {
  // return ajax.post('/api/v1/login', params)

  // 模拟一次登录 (网络原因)
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          token: 'asdfqwerypoyipoyhpsag',
          username: 'Leo'
        }
      })
    }, 2000)
  })
}
