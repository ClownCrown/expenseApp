<template>
  <div class="ui centered card" @keyup.enter="validateBeforeAdd()">
      <div class="ui compact info message" v-show="hasError">
        <p>pls fill all required values!</p>
      </div>
      <div class="ui input">
        <input placeholder="Enter desc" type="text" v-model="expItem.desc" name="desc">
      </div>
      <div class="ui right labeled input">
        <label for="amount" class="ui label">$</label>
        <input placeholder="Enter amount" type="number" 
                name="price" min="0" v-model="expItem.price">
      </div>
      <select v-model="expItem.type">
        <option v-for="exType in this.$store.state.expenseTypes" 
                v-bind:key="exType.id"
                v-bind:value="exType.id"
                required>
          {{ exType.value }}
        </option>
      </select>
      <button class="ui primary button" v-on:click="validateBeforeAdd()">
        Save
      </button>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Expense from "../expense";

export default {
  name: "ExpenseAddition",
  data() {
    return {
      //expItem: { header: "test", price: 0, desc: "", type: "" },
      expItem: new Expense(),
      hasError: false
    };
  },
  methods: {
    ...mapMutations({
      addExpense: "addExpense"
    }),
    validateBeforeAdd() {
      if (
        !this.expItem.desc ||
        !this.expItem.price ||
        typeof this.expItem.type == "undefined"
      ) {
        this.hasError = true;
      } else {
        this.hasError = false;
        this.addExpToList();
      }
    },
    addExpToList() {
      var expItemAdd = {
        header: this.expItem.header,
        price: this.expItem.price,
        desc: this.expItem.desc,
        type: this.expItem.type,
        iconImg:
          "https://png.icons8.com/color/50/000000/" +
          this.expItem.desc.toLowerCase() +
          ".png"
      };
      this.$store.commit("addExpense", expItemAdd);
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
