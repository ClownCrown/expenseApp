<template>
  <div id="app" class="ui main center aligned container">
    <h1 class="ui center aligned header">ExpenseApp</h1>
    <a href="https://icons8.com">Icon pack by Icons8</a>

    <IncomeInput />

    <ExpenseAddition />
    
    <div class="ui divided list">
      <ExpenseListItem 
        v-for="exp in expenseList"
        v-bind:key="exp.id"
        :id="exp.id"
        :header="exp.header"
        :price="exp.price"
        :desc="exp.desc"
        :type="exp.type"
        :iconImg="exp.iconImg"/>

    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import IncomeInput from "./components/IncomeInput";
import ExpenseAddition from "./components/ExpenseAddition";
import ExpenseListItem from "./components/ExpenseListItem";
import Expense from "./expense.js";

export default {
  name: "App",
  components: {
    HelloWorld,
    IncomeInput,
    ExpenseAddition,
    ExpenseListItem
  },

  computed: {
    expenseList() {
      return this.$store.state.expensesList;
    }
  }
};
</script>

<style>
</style>
