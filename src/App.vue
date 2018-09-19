<template>
  <div id="app" class="ui main container center aligned">
    <h1 class="ui center aligned header">ExpenseApp</h1>
    <a href="https://icons8.com">Icon pack by Icons8</a>

    <IncomeInput />

    <ButtonNavBar v-if="expenseList.length > 0"/>

    <ExpenseAddition v-if="totalIncome > 0"/>
    
    <div class="ui centered cards">
      <ExpenseListItem 
        v-for="exp in expenseList"
        v-bind:key="exp.id"
        :expProp="exp"/>

    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import IncomeInput from "./components/IncomeInput";
import ExpenseAddition from "./components/ExpenseAddition";
import ExpenseListItem from "./components/ExpenseListItem";
import Expense from "./expense.js";
import ButtonNavBar from "./components/ButtonNavBar";

export default {
  name: "App",
  components: {
    HelloWorld,
    IncomeInput,
    ExpenseAddition,
    ExpenseListItem,
    ButtonNavBar
  },

  computed: {
    expenseList() {
      return this.$store.state.expensesList;
    },

    totalIncome() {
      return this.$store.state.totalIncome;
    }
  }
};
</script>

<style>
</style>
