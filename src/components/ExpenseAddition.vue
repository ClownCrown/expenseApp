<template>
  <div class="ui centered card">
      <div class="ui input">
        <input placeholder="Enter desc" type="text" v-model="expItem.desc">
      </div>
      <div class="ui right labeled input">
        <label for="amount" class="ui label">$</label>
        <input placeholder="Enter amount" type="number" v-model="expItem.price">
      </div>
      <select v-model="expItem.type">
        <option v-for="exType in this.$store.state.expenseTypes" v-bind:value="exType.id">
          {{ exType.value }}
        </option>
      </select>
      <button class="ui primary button" v-on:click="addExpToList(expItem)">
        Save
      </button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ExpenseAddition',
  data() {
    return {
      expItem: { header: 'test', price: 0, desc:'', type:'' }
    }
  },
  methods: {
    ...mapMutations({
      addExpense: 'addExpense'
    }),
    addExpToList(){
      var expItemAdd = { header: this.expItem.header, price: this.expItem.price, 
                        desc:this.expItem.desc, type: this.expItem.type};
      this.$store.commit('addExpense', expItemAdd);
    }
  },
  watch: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
