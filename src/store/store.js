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
      state.expensesList.splice(payload.id, 1);
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
    },

    getDatesArray: state => {
      let array = [];
      let expList = state.expensesList;
      for (let index in expList) {
        if (array.length == 0)
          array.push({
            date: expList[index].date,
            counter: 1
          });
        else {
          for (let dateItem in array) {
            if (
              array[dateItem].date.year() === expList[index].date.year() &&
              array[dateItem].date.month() === expList[index].date.month()
            ) {
              array[dateItem].counter++;
            } else {
              array.push({
                date: expList[index].date,
                counter: 1
              });
            }
          }
        }
      }
      return array;
    }
  }
});

export default store;
