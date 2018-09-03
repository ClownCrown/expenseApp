<template>
  <div class="card">
    <div class="left aligned content">
      <img class="right floated mini ui image" v-bind:src="iconImg" 
        onerror='this.onerror = null; this.src="https://png.icons8.com/material/50/000000/shopping-cart.png"'>
    
      <a class="header">{{header}} - {{this.$store.state.expenseTypes[type].value}}</a>
      <div class="meta"> 
        <span class="price">{{price}} shekels </span>
      </div>
      <div class="description">
        {{desc}}
      </div>
    </div>
    
    <div class="extra content">
      <div class="ui two buttons">
        <div class="ui basic green button" v-on:click="removeExpense(id)"> edit </div>
        <div class="ui basic red button" v-on:click="removeExpense(id)"> remove </div>
      </div>
    </div>   
  </div>
</template>


<script>
/**
 * TODO: add edit option for expenseItem!
 */
export default {
  name: "ExpenseListItem",
  props: ["id", "header", "price", "desc", "type", "iconImg"],
  data() {
    return {};
  },
  watch: {},
  methods: {
    removeExpense(id) {
      this.$store.commit("deleteExpense", id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
