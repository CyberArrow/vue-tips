<template>
<div class="bill__wrapper">
  <div class="bill__header">
    <img src="https://cdn.dribbble.com/users/4107928/screenshots/13953905/media/8654414612582005be8f296e06f95f95.jpg?compress=1&resize=1600x1200" />
    <div class="bill__header__info">
      <typo :size="16" :weight="600">TIP TICKET</typo>
      <typo :size="16" color="gray">#154738491</typo>
    </div>
  </div>
  <div class="bill__body">
    <div class="bill__body__container">
      <div class="bill__body__content">
        <typo :size="28" color="gray">Conta</typo>
        <typo :size="32" :weight="600">{{ currency.label }} {{ price }}</typo>
      </div>
      <div class="bill__body__content">
        <typo :size="28" color="gray">Gorjeta</typo>
        <typo :size="32" :weight="600">{{ currency.label }} {{ tip }}</typo>
      </div>
      <div class="bill__body__content">
        <typo :size="28" color="gray">Total</typo>
        <typo :size="32" :weight="600">{{ currency.label }} {{ total }}</typo>
      </div>
      <div class="bill__body__content">
        <typo :size="28" color="gray">Por pessoa</typo>
        <typo :size="32" :weight="600">{{ currency.label }} {{ perPeople }}</typo>
      </div>
      <div class="bill__body__content">
        <typo :size="28" color="gray">Em R$(reais)</typo>
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          />
          <typo v-else :size="32" :weight="600">R$ {{ fixedValue }}</typo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import typo from './typo.vue';
export default {
  components: { typo },
  name: "Bill",
  props: [
    "currency",
    "price",
    "tip",
    "total",
    "perPeople",
    "loading",
    "fixedValue",
  ],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.bill {
  &__ {
    &wrapper {
      width: 350px;
      background: map-get($pallete, white);
      height: 620px;
      margin: 0 auto;
      &:after {
        content: '';
        display: block;
        position: relative;
        clear: both;
      }
    }
    &header {
      border-bottom: 1px dashed #ddd;
      position: relative;
      padding: 12px;
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;
      margin: -12px;
      align-items: center;

      img {
       width: 160px;
      }

      &:before, &:after {
        background-color: map-get($pallete, white-dark);
        position: absolute;
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        bottom: 0;
        margin-bottom: -10px;
      }
      &:before {
        left: 0;
        margin-left: 3px;
      }
      &:after {
        right: 0;
        margin-right: 3px;
      }
      &__ {
        &info {
         display: flex;
         flex-direction: column;
        }
      }
   }
    &body {
      &__ {
        &container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          margin-top: 26px;
        }
        &content {
          display: flex;
          flex-direction: column;
          text-align: center;
          align-items: center;
        }
      }
    }
  }
}
</style>