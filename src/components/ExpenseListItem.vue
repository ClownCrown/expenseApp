<template>
  <div class="item">
    <img class="image" v-bind:src="iconImg"
            onerror='this.onerror = null; this.src="https://png.icons8.com/material/50/000000/shopping-cart.png"'>
    <div class="content">
      <a class="header">{{header}}</a>
      <div class="meta">
        <span class="price">{{price}}</span>
      </div>
      <div class="description"> {{desc}}</div>
      <div class="extra details"> {{this.$store.state.expenseTypes[type].value}}</div>
    </div>
    
    <button class="ui icon secondary button" v-on:click="removeExpense(id)">
      <i class="eraser icon"></i>
    </button>    
  </div>
</template>


<script>
/**
 * TODO: move everything to GRID layout
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
