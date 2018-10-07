<template>
  <div class="card">
    <div class="left aligned content">
      <img class="right floated mini ui image" v-bind:src="exp.iconImg" 
        onerror='this.onerror = null; this.src="https://png.icons8.com/material/50/000000/shopping-cart.png"'>
    
      <a class="header" style="text-transform: capitalize;"> {{exp.desc}}</a>
      <div class="meta"> 
        <span class="price">{{exp.price}} shekels </span>
      </div>
      <div class="description">
        {{this.$store.state.expenseTypes[exp.type].value}} - {{exp.date.format("D/M/YYYY, hh:mm")}}
      </div>
    </div>
    
    <div class="extra content">
      <div class="ui two buttons">
        <div class="ui basic green button" v-on:click="editExpense(exp.id)"> edit </div>
        <div class="ui basic red button" v-on:click="removeExpense(exp.id)"> remove </div>
      </div>
    </div>   
  </div>
</template>


<script>
import { serverBus } from "../main.js";
import Expense from "../expense";

export default {
  name: "ExpenseListItem",
  props: ["expProp"],
  data() {
    return {
      exp: new Expense()
    };
  },
  created: function() {
    this.exp = this.expProp;
  },
  watch: {},
  methods: {
    removeExpense(id) {
      this.$store.commit("deleteExpense", id);
    },
    editExpense(id) {
      serverBus.$emit("expenseId", id);
      this.$modal.show("expense-modal", { editable: true });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
