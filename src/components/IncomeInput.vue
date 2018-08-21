<template>
<div class="ui three column stackable grid">
      <div class="row">
        <div class="sixteen wide column">
          <div class="ui left icon input focus">
            <i class="shekel sign icon"></i>
            <input v-model="total_income" placeholder="totalIncome" type="number">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <a class="ui label">
            FUN SHARE STUFF
            <div class="detail">
              <i class="shekel sign icon"></i>
              {{ fun_share }}
            </div>
          </a>
        </div>
        <div class="column">
          <a class="ui label">
            INVESTMENT SHARE
            <div class="detail">
              <i class="shekel sign icon"></i>
              {{ inveset_share }}
            </div>
          </a>
        </div>
        <div class="column">
          <a class="ui label">
            NECCESSARY SHARE
            <div class="detail">
              <i class="shekel sign icon"></i>
              {{ neccessary_share - sumOfNeccessary}}
            </div>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'IncomeInput',
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
    ...mapGetters([
      'sumOfNeccessary',
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
