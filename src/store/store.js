import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    totalIncome: 0,
    expenseTypes: [{
      id: 0,
      value: 'neccessary'
    }, {
      id: 1,
      value: 'fun'
    }],
    expensesList: [
      // {
      // id: 1,
      // header: 'ds',
      // price: 123,
      // desc: 'asdsadd',
      // type: 0,
      // }, 
    ],
    counter: 123,
  },

  mutations: {
    addExpense(state, payload) {
      payload.id = state.expensesList.length;
      state.expensesList.push(payload);
    },
    deleteExpense(state, payload) {
      state.expensesList.splice(payload, 1);
    },
    addTotalIncome(state, payload) {
      state.totalIncome = payload;
    },
    updateExpense(state, payload) {
      state.expensesList.splice(payload.id, 1, payload);
    }
  },

  getters: {
    sumOfNeccessary: state => {
      return state.expensesList.filter(exp => exp.type === state.expenseTypes[0].id)
        .reduce(function (total, value) {
          return total + Number(value.price);
        }, 0);
    },

    sumOfFun: state => {
      return state.expensesList.filter(exp => exp.type === state.expenseTypes[1].id)
        .reduce(function (total, value) {
          return total + Number(value.price);
        }, 0);
    },

    getExpById: (state) => (id) => {
      return state.expensesList.find(exp => exp.id === id);
    }
  }
});

export default store;
