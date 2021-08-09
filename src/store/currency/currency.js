import axios from "axios"

export const state = () => ({
  currency: {
    quote: null,
  }
})

export const getters = {
  getCurrency: (state) => state.currency
}

export const mutations = {
  setCurrency: (state, value) => {
    state.currency = value;
  }
}

export const actions = {
  async listCurrencies ({ commit }, currency) {
    try {
      const { data } = await axios.get(
        `https://swop.cx/rest/rates/${currency}/BRL?api-key=56132eaead48a4add8692447428d48359254d9c182f489817543586e02fba73e`
      )
      commit('setCurrency', data)
    } catch (e) {
      console.log(e)
    }
  }
}

export default { actions, getters, mutations, state }