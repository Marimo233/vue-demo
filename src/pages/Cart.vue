<template>
  <div class="cart">
    <div v-if="isCartEmpty">
      购物车空了…
    </div>
    <div v-else>
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :id="item.id"
        :img="item.img"
        :title="item.title"
        :price="item.price"
        :count="item.count"
        :isChecked="item.isChecked"
      />
      <div>
        <input type="checkbox" :checked="isAllChecked" @change="changeAllCheck($event.target.checked)"> 全选
      </div>
      <div>总的数量: {{totalCount}} 总的价格: {{totalPrice | tofix}}</div>
      <div>选中总的数量: {{selectedTotalCount}} 总的价格: {{selectedTotalPrice | tofix}}</div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations
} from 'vuex'
import CartItem from '@/components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem
  },
  methods: {
    ...mapMutations(['changeAllCheck'])
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters([
      'totalCount',
      'totalPrice',
      'selectedTotalCount',
      'selectedTotalPrice',
      'isAllChecked'
    ]),
    isCartEmpty () {
      return this.cart.length === 0
    }
  }
}
</script>

<style>

</style>
