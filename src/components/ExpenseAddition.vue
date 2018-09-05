<template>
  <div>
    <modal name="expense-modal" transition="pop-out" :pivot-y="0.1" :adaptive="true" classes="modalComp" height="auto"
      :scrollable="true" :reset="true" :min-width="200" :min-height="200">
      <div class="center aligned container" @keyup.enter="validateBeforeAdd()">
        <div class="ui form">
          <h4 class="ui center aligned dividing header">Add expense</h4>
          
          <div class="ui message" v-show="hasError">
            <p>pls fill all required values!</p>
          </div>

          <div class="field">
            <label>Expense description</label>
            <input placeholder="Enter desc" type="text" v-model="expItem.desc" name="desc">
          </div>
          
          <div class="field">
            <label>Expense amount</label>
            <input placeholder="Enter amount" type="number"
                      name="price" min="0" v-model="expItem.price">
          </div>

          <div class="field">
            <label>Date</label>
            <masked-input v-model="expItem.date" placeholder="dd/MM/yyyy" :mask="{ pattern: '11/11/1111' }"/> 
          </div>

          <div class="field">
            <label>Expense Type</label>
            <select v-model="expItem.type" class="ui dropdown">
              <option v-for="exType in this.$store.state.expenseTypes" 
                      v-bind:key="exType.id"
                      v-bind:value="exType.id"
                      required>
                {{ exType.value }}
                </option>
              </select>
            </div>

          <button class="fluid ui bottom attached primary basic button" v-on:click="validateBeforeAdd();">
            Save
          </button>
        </div>
      </div>

    </modal>

    <div class="ui centered grid">
      <div class="row">
        <button class="ui primary button" v-on:click="show()">
          Add new Expense!
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Expense from "../expense";
import MaskedInput from "vue-masked-input";
import moment from "moment";

export default {
  name: "ExpenseAddition",
  components: {
    MaskedInput
  },
  data() {
    return {
      //expItem: { header: "test", price: 0, desc: "", type: "" },
      expItem: new Expense(),
      showModal: false,
      hasError: false
    };
  },
  methods: {
    ...mapMutations({
      addExpense: "addExpense"
    }),
    show() {
      this.$modal.show("expense-modal");
    },
    hide() {
      this.$modal.hide("expense-modal");
    },
    validateBeforeAdd() {
      console.log(moment(this.expItem.date, "DD/MM/YYYY", true).isValid());
      if (
        !this.expItem.desc ||
        !this.expItem.price ||
        typeof this.expItem.type == "undefined" ||
        !moment(this.expItem.date, "DD/MM/YYYY", true).isValid()
      ) {
        this.hasError = true;
      } else {
        this.hasError = false;
        this.addExpToList();
        this.hide();
      }
    },
    addExpToList() {
      var expItemAdd = {
        //header: this.expItem.header,
        header: "header demo",
        price: this.expItem.price,
        desc: this.expItem.desc,
        type: this.expItem.type,
        iconImg:
          "https://png.icons8.com/color/50/000000/" +
          this.expItem.desc.toLowerCase() +
          ".png",
        date: this.expItem.date
      };
      this.$store.commit("addExpense", expItemAdd);
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.modalComp {
  background-color: white !important;
  text-align: center !important;
  border-radius: 3px !important;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4) !important;
  padding: 2% !important;
}
</style>
