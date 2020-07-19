<template>
  <div class="cate-item">
    <div class="cate-item-status">
      <input
        type="checkbox"
        :checked="isChecked"
        @change="toggleChecked(id)"
      >
    </div>
    <div class="cate-item-img">
      <img :src="img" :alt="title" />
    </div>
    <div class="cate-item-info">
      <div class="cate-item-title">
        {{title}}
      </div>
      <div class="cate-item-price">
        ￥ {{price}}
      </div>
    </div>
    <div class="cate-item-actions">
      <span class="btn" @click="reduceCartItemCount(id)">-</span>
      <span class="count">
        {{count}}
      </span>
      <span class="btn" @click="addCartItemCount(id)">+</span>
    </div>
  </div>
</template>

<script>
import {
  mapMutations
} from 'vuex'
export default {
  name: 'CateItem',
  props: {
    id: {
      type: Number,
      required: true
    },
    img: String,
    title: String,
    price: Number,
    count: Number,
    isChecked: Boolean
  },
  methods: {
    ...mapMutations([
      'addCartItemCount',
      'reduceCartItemCount',
      'toggleChecked'
    ])
  }
}
</script>

<style lang="scss" scoped>
.cate-item {
  padding: 16px;
  display: flex;
  height: 80px;
  background-color: #fff;
  margin: 12px;

  &-img {
    width: 60px;
    height: 80px;
    background-color: #dedede;
    img {
      max-width: 100%;
    }
  }

  &-info {
    margin: 0 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    flex: 1;
  }

  &-actions {
    border: 1px solid #dedede;
    align-self: center;
    border-radius: 3px;

    span {
      display: inline-block;
      height: 20px;
      width: 16px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;

      &.count {
        border: 1px solid #dedede;
        border-width: 0 1px;
        width: 30px;
      }
    }
  }
}
</style>
