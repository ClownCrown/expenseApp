<template>
<div class="ui three column stackable centered grid">
      <div class="centered row">
        <div class="ui left icon input focus">
          <i class="shekel sign icon"></i>
          <input v-model="total_income" placeholder="totalIncome" type="number">
        </div>
      </div>

      <div class="centered row">
        <div class="ui statistics">
          <div class="statistic">
            <div class="value">
              <img src="https://png.icons8.com/dotty/50/000000/shekel.png" class="ui circular inline image">
              {{ fun_share - sumOfFun}}
            </div>
            <div class="label">
              FUN SHARE STUFF
            </div>
          </div>
          <div class="statistic">
            <div class="value">
              <img src="https://png.icons8.com/dotty/50/000000/shekel.png" class="ui circular inline image">
              {{ inveset_share }}
            </div>
            <div class="label">
              INVESTMENT SHARE
            </div>
          </div>
          <div class="statistic">
            <div class="value">
              <img src="https://png.icons8.com/dotty/50/000000/shekel.png" class="ui circular inline image">
              {{ neccessary_share - sumOfNeccessary}}
            </div>
            <div class="label">
              NECCESSARY SHARE
            </div>
          </div>                    
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "IncomeInput",
  data() {
    return {
      total_income: 0,
      fun_share: 0,
      inveset_share: 0,
      neccessary_share: 0
    };
  },
  watch: {
    total_income: function() {
      if (this.total_income == 0) {
        this.fun_share = 0;
        this.inveset_share = 0;
        this.neccessary_share = 0;
      }
      this.fun_share = (this.total_income * 0.3).toFixed(2);
      this.inveset_share = (this.total_income * 0.2).toFixed(2);
      this.neccessary_share = (this.total_income * 0.5).toFixed(2);
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["sumOfNeccessary", "sumOfFun"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
