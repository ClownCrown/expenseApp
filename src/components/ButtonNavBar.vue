<template>
  <div >
    Filter list by month: 
    <div class="ui inline dropdown">
      <div class="text">
        All months
      </div>
      <i class="dropdown icon"></i>
      <div class="menu">
        <div class="item" @click="setDateFilter(null)">All months</div>
        <div class="item" v-for="dateItem in datesArray" v-bind:key="dateItem.date.valueOf()" @click="setDateFilter(dateItem.date)">
          {{dateItem.date.format("M/YYYY")}} - {{dateItem.counter}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "ButtonNavBar",
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      datesArray: "getDatesArray"
    })
  },
  methods: {
    ...mapMutations({
      setDateFilter: "setDateFilter"
    })
  },
  mounted() {
    $(".ui.dropdown").dropdown();
  }
};
</script>

<style>
</style>
