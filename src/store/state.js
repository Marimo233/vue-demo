export default {
  cart: JSON.parse(window.localStorage.getItem('rzg-cart')) || [],
  pageTitle: '人造革商城',
  isLogin: Boolean(window.localStorage.getItem('rzg-token')) // 实际要根据需求来，有可能需要检测token的合法性
}
