<template>
  <div class="calculator__container">
    <div class="calculator__content__switch">
      <typo :size="36" color="yellow-dark">EUR</typo>
      <v-switch v-model="_currencySwitcher" color="warning" inset />
      <typo :size="36" color="yellow-dark">USD</typo>
    </div>
    <div class="calculator__content__value">
      <typo :size="36" color="yellow-dark">Valor</typo>
      <v-text-field
        prepend-icon="mdi-currency-usd"
        solo
        hide-details
        dense
        v-model.lazy="_price"
        v-money="money"
      />  
    </div>
    <div class="calculator__content__slider">
      <typo :size="36" color="yellow-dark">Gorjeta: {{ _tip }}%</typo>
      <v-spacer />
      <v-slider step="1" v-model="_tip" :max="maximumTip" :min="minimumTip">
        <template v-slot:prepend>
          <span>{{ minimumTip }}</span>
        </template>
        <template v-slot:append>
          <span>{{ maximumTip }}</span>
        </template>
      </v-slider>
    </div>
    <div class="calculator__content__slider">
      <typo :size="36" color="yellow-dark">Pessoas: {{ _people }}</typo>
      <v-slider step="1" v-model="_people" :max="maximumPeople" :min="minimumPeople">
        <template v-slot:prepend>
          <span>{{ minimumPeople }}</span>
        </template>
        <template v-slot:append>
          <span>{{ maximumPeople }}</span>
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script>
import typo from './typo.vue';
export default {
  components: { typo },
  name: "Calculator",
  props: [
    "currencySwitcher",
    "price",
    "tip",
    "minimumTip",
    "maximumTip",
    "people",
    "minimumPeople",
    "maximumPeople",
  ],
  data: () => ({
    money: {
      decimal: ".",
      thousands: "",
      precision: 2,
      masked: false,
    },
  }),
  computed: {
    _currencySwitcher: {
      get() {
        return this.currencySwitcher;
      },
      set(newValue) {
        this.$emit("update:currencySwitcher", newValue);
      },
    },
    _price: {
      get() {
        return this.price;
      },
      set(newValue) {
        this.$emit("update:price", newValue);
      },
    },
    _tip: {
      get() {
        return this.tip;
      },
      set(newValue) {
        this.$emit("update:tip", newValue);
      },
    },
    _people: {
      get() {
        return this.people;
      },
      set(newValue) {
        this.$emit("update:people", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.calculator {
  &__ {
    &container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 50px;
    }
    &content {
      &__ {
        &switch {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          width: 100%;
          background-color: map-get($pallete, white);
          border: 1px solid map-get($pallete, white);
          border-radius: 8px;
        }
        &value {
          display: flex;
          align-items: center;
          width: 100%;
          background-color: map-get($pallete, white);
          border: 1px solid map-get($pallete, white);
          border-radius: 8px;
          padding: 12px;
        }
        &slider {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 100%;
          background-color: map-get($pallete, white);
          border: 1px solid map-get($pallete, white);
          border-radius: 8px;
          padding: 12px;
        }
      }
    }
  }
}
</style>