<template>
  <div id="app" class="ui main center aligned container">
    <h1 class="ui center aligned header">ExpenseApp</h1>

    <IncomeInput />

    <ExpenseAddition />
    
    <div class="ui middle aligned divided list">
      <ExpenseListItem 
        v-for="exp in expenseList"
        v-bind:key="exp.id"
        :header="exp.header"
        :price="exp.price"
        :desc="exp.desc"
        :type="exp.type"/>

      <div class="item">
        <div class="content">
          <a class="header">Ebay</a>
          <div class="description"> 55 shekels</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import IncomeInput from './components/IncomeInput';
import ExpenseAddition from './components/ExpenseAddition';
import ExpenseListItem from './components/ExpenseListItem';

export default {
  name: 'App',
  components: {
    HelloWorld,
    IncomeInput,
    ExpenseAddition,
    ExpenseListItem,
  },

  computed: {
    expenseList () {
      return this.$store.state.expensesList;
    }
  }
};
</script>

<style>

</style>
