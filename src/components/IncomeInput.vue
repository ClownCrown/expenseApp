<template>
<div class="ui three column stackable center aligned grid">
      <div class="centered row">
        <div class="ui left icon input focus">
          <i class="shekel sign icon"></i>
          <input v-model="total_income" placeholder="Enter monthly income" type="number" 
                data-step="1" data-intro="Enter your income here, mate!"/>
        </div>
      </div>

      <div class="centered row" style="margin-top: 5%;">
        <div class="ui small sixteen statistics" 
              style="display: flex; justify-content: center; align-items: center; align-content: center;">
          <div class="statistic">
            <div class="value">
              <i class="shekel sign icon"></i>
              {{ (fun_share - sumOfFun).toPrecision(4)}}
            </div>
            <div class="label">
              FUN SHARE <br> STUFF
            </div>
          </div>
          <div class="statistic">
            <div class="value">
              <i class="shekel sign icon"></i>
              {{ (Number(inveset_share)).toPrecision(4) }}
            </div>
            <div class="label">
              INVESTMENT <br> SHARE
            </div>
          </div>
          <div class="statistic">
            <div class="value">
              <i class="shekel sign icon"></i>
              {{ (neccessary_share - sumOfNeccessary).toPrecision(4)}}
            </div>
            <div class="label">
              NECCESSARY <br> SHARE
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
  mounted() {
    if (this.$store.state.totalIncome > 0)
      this.total_income = this.$store.state.totalIncome;
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
      this.$store.commit("addTotalIncome", this.total_income);
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
