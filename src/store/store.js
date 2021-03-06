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
    expensesList: [],
    counter: 123,
    dateFilter: null
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
    },
    setDateFilter(state, payload) {
      state.dateFilter = payload;
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
      let newIndex = 0

      // Creates an array of dates from the expenseList
      for (let index in expList) {
        array.push({
          id: index,
          date: expList[index].date,
          counter: 0
        });
      }

      let newArray = []

      // Counting the duplicates dates
      for (let index in array) {
        let tempArray = array.filter(dateItem => dateItem.date.year() == array[index].date.year() &&
          dateItem.date.month() == array[index].date.month())

        array[index].counter = tempArray.length
      }

      // Removing the duplicates dates
      for (let index in array) {
        if (!newArray.some(dateItem => dateItem.date.year() == array[index].date.year() &&
            dateItem.date.month() == array[index].date.month())) {
          newArray.push(array[index])
        }
      }

      return newArray;
    }
  }
});

export default store;
