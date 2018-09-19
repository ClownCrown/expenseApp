<template>
  <div class="ui horizontal center aligned menu">
    <a class="teal item" v-for="dateItem in datesArray" v-bind:key="dateItem.date.toString()">
      {{dateItem.date.format("M/YYYY")}}
      <div class="ui teal left pointing label">{{dateItem.counter}}</div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
  }
};
</script>

<style>
</style>
