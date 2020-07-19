export default {
  totalCount ({ cart }) {
    return cart.reduce((total, item) => {
      total += item.count
      return total
    }, 0)
  },
  selectedTotalCount ({ cart }) {
    return cart.filter(item => item.isChecked === true).reduce((total, item) => {
      total += item.count
      return total
    }, 0)
  },
  totalPrice ({ cart }) {
    return cart.reduce((total, item) => {
      total += item.count * item.price
      return total
    }, 0)
  },
  selectedTotalPrice ({ cart }) {
    return cart.filter(item => item.isChecked === true).reduce((total, item) => {
      total += item.count * item.price
      return total
    }, 0)
  },
  isAllChecked ({ cart }) {
    return cart.every(item => item.isChecked === true)
  }
}
