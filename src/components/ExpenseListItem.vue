<template>
  <div class="item">
    <div class="content">
      <a class="header">{{header}}</a>
      <div class="meta">
        <span class="price">{{price}}</span>
      </div>
      <div class="description"> {{desc}}</div>
      <div class="description"> {{this.$store.state.expenseTypes[type].value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpenseListItem',
  props: ['header','price','desc','type'],
  data() {
    return {
      
    }
  },
  watch: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
