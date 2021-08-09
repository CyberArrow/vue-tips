<template>
  <v-app>
    <v-app-bar color="amber darken-3" dark>
      <v-toolbar-title>Tip App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="mb-6">
        <v-row justify="space-around" no-gutters>
          <v-col class="py-8" cols="12">
            <h1 class="display-2 font-weight-bold mb-3 text-center">Le/Tip</h1>
          </v-col>
          <v-col v-if="!next" cols="12" xl="3" lg="4" md="4" sm="5" xs="12">
            <Calculator
              :currencySwitcher.sync="currencySwitcher"
              :price.sync="price"
              :tip.sync="tip"
              :minimumTip="minTip"
              :maximumTip="maxTip"
              :people.sync="people"
              :minimumPeople="minPeople"
              :maximumPeople="maxPeople"
            />
          </v-col>
          <v-col v-if="!$vuetify.breakpoint.xs || next" cols="12" sm="4">
            <Bill
              :currency="currency"
              :price="price"
              :tip="billTip"
              :total="billPrice"
              :perPeople="perPeople"
              :loading="loading"
              :fixedValue="fixedValue"
            />
          </v-col>
        </v-row>
        <v-btn fab bottom right absolute class="mb-14" color="warning" @click="next = !next" v-if="$vuetify.breakpoint.xs">
          <v-icon color="white">{{ next ? "mdi-chevron-left" : "mdi-chevron-right" }}</v-icon>
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Calculator from "./components/calculator";
import Bill from "./components/bill";
export default {
  name: "App",
  components: {
    Calculator,
    Bill
  },
  data: () => ({
    currencySwitcher: true,
    price: 0,
    tip: 10,
    minTip: 10,
    maxTip: 20,
    people: 2,
    minPeople: 2,
    maxPeople: 16,
    loading: false,
    currency: {
      label: "$",
      value: "USD",
    },
    next: false,
  }),
  watch: {
    async currencySwitcher() {
      this.currencySwitcher
        ? (this.currency = {
            label: "$",
            value: "USD",
          })
        : (this.currency = {
            label: "€",
            value: "EUR",
          });
      this.loading = true;
      await this.listCurrencies(this.currency.value);
      this.loading = false;
    },
  },
  async mounted() {
    this.loading = true;
    await this.listCurrencies(this.currency.value);
    this.loading = false;
  },
  computed: {
    ...mapGetters(["getCurrency"]),
    billTip() {
      if (this.price != 0) {
        let result = String(this.price * (this.tip / 100));
        if (result.includes(".")) {
          result = result.split(".");
          if (result.length > 1)
            result = result[0] + "." + result[1].substr(0, 3);
        } else {
          result = result + ".00";
        }
        return result;
      } else {
        return "0.00";
      }
    },
    billPrice() {
      if (this.price != 0 && this.billTip != "0.00") {
        let result = String(parseFloat(this.price) + parseFloat(this.billTip));
        if (result.includes(".")) {
          result = result.split(".");
          if (result.length > 1)
            result = result[0] + "." + result[1].substr(0, 2);
        } else {
          result = result + ".00";
        }
        return result;
      } else return "0.00";
    },
    perPeople() {
      return (parseFloat(this.billPrice) / +this.people).toFixed(2);
    },
    fixedValue() {
      return (parseFloat(this.billPrice) * this.getCurrency.quote).toFixed(2);
    },
  },
  methods: {
    ...mapActions(["listCurrencies"]),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
@import "@/assets/scss/app";

.v-main {
  background-color: map-get($pallete, white-dark);
}
</style>
