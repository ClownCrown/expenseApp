<template>
  <div id="app">
      <div class="ui vertical inverted left sidebar menu">
        <a class="item" onclick="$('.ui.sidebar').sidebar({transition: 'overlay',mobileTransition: 'overlay'}).sidebar('hide'); introJs().start();">
          <i class="question yellow circle outline icon"></i>
            Help
        </a>
        <a class="item" @click="exportExcel()">
          <i class="green file excel circle outline icon"/>
              Excel Export
        </a>
        <a class="item">
          About
        </a>
      </div>
    <div class="ui main grid container center aligned pushable">        
      <nav class="row" style="display: flow-root; margin-top: 2%; text-align: left;">
        <button class="ui compact left floated button" onclick="$('.ui.sidebar').sidebar({transition: 'overlay',mobileTransition: 'overlay'}).sidebar('toggle');">
          <i class="list icon"></i>
          Menu
        </button>
      </nav>    

    <IncomeInput class="row"/>

    <ButtonNavBar class="left aligned row" style="padding: 0px" v-if="expenseList.length > 0"/>

    <ExpenseAddition class="row" v-if="totalIncome > 0"/>
    
    <div class="ui centered cards">
      <ExpenseListItem 
        v-for="exp in expenseList"
        v-bind:key="exp.id"
        :expProp="exp"/>
    </div>
    </div>
    
    <a href="https://icons8.com" class="footer">Icon pack by Icons8</a>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import IncomeInput from "./components/IncomeInput";
import ExpenseAddition from "./components/ExpenseAddition";
import ExpenseListItem from "./components/ExpenseListItem";
import Expense from "./expense.js";
import ButtonNavBar from "./components/ButtonNavBar";
import moment from "moment";
import XLSX from "xlsx";
import Download from "downloadjs";
import { Slide } from "vue-burger-menu";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      show: false,
      jsonFields: {
        "Expense ID": "id",
        Description: "desc",
        Price: "price",
        Type: {
          field: "type",
          callback: typeValue => {
            return this.$store.state.expenseTypes[typeValue].value;
          }
        },
        Date: {
          field: "date",
          callback: value => {
            return value.format("D/M/YYYY");
          }
        }
      }
    };
  },
  components: {
    HelloWorld,
    IncomeInput,
    ExpenseAddition,
    ExpenseListItem,
    ButtonNavBar,
    Slide
  },
  created() {
    if (localStorage.getItem("totalIncome")) {
      let incomeTemp = Number(localStorage.getItem("totalIncome"));

      this.$store.state.totalIncome = incomeTemp;
    }

    if (localStorage.getItem("expenseList")) {
      //console.log("found list in memory");
      let expListToInit = JSON.parse(localStorage.getItem("expenseList"));

      expListToInit.forEach(function(exp) {
        var date = new Date(exp.date);
        exp.date = moment(date, "DD-MM-YYYY");
      });

      this.$store.state.expensesList = expListToInit;
    } else {
      swal({
        title: "No list to be found ):",
        text: "Lets start over!",
        type: "warning",
        confirmButtonText: "OK"
      });
    }
  },
  mounted() {},
  computed: {
    expenseList() {
      if (this.$store.state.expensesList.length > 0) {
        let parsed = JSON.stringify(this.$store.state.expensesList);
        //console.log(parsed);
        localStorage.setItem("expenseList", parsed);
      } else {
        localStorage.setItem("expenseList", []);
      }

      if (this.$store.state.dateFilter != null)
        return this.$store.state.expensesList.filter(
          item =>
            item.date.year() == this.$store.state.dateFilter.year() &&
            item.date.month() == this.$store.state.dateFilter.month()
        );
      else return this.$store.state.expensesList;
    },

    totalIncome() {
      if (this.$store.state.totalIncome > 0) {
        localStorage.setItem("totalIncome", this.$store.state.totalIncome);
      }
      return this.$store.state.totalIncome;
    },

    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      datesArray: "getDatesArray"
    })
  },
  methods: {
    exportExcel() {
      $(".ui.sidebar")
        .sidebar({ transition: "overlay", mobileTransition: "overlay" })
        .sidebar("hide");

      let wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Export History - " + new Date(),
        Subject: "Test",
        Author: "ExpenseManager",
        CreatedDate: new Date()
      };

      wb.SheetNames.push("Month");

      let expenseListForExcel = [];
      let excelSheetNamesDates = [];
      for (let i = 0; i < this.$store.state.expensesList.length; i++) {
        expenseListForExcel.push({
          id: this.$store.state.expensesList[i].id,
          Desc: this.$store.state.expensesList[i].desc,
          Date: this.$store.state.expensesList[i].date.format("D/M/YYYY"),
          Price: this.$store.state.expensesList[i].price,
          "Expense type": this.$store.state.expenseTypes[
            this.$store.state.expensesList[i].type
          ].value
        });
      }

      // TODO: sort array of dates and match it to expenseList to create a unique sheet for every month
      //this.getDatesArray;

      var ws = XLSX.utils.json_to_sheet(expenseListForExcel);
      XLSX.utils.sheet_add_json(ws, [{}], {
        //header: ["A", "B", "C", "D", "E", "F", "G"]//,
        //skipHeader: true
        //origin:
      });

      var wscols = [
        { wch: 5 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 }
      ];

      ws["!cols"] = wscols;

      wb.Sheets["Month"] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

      var buf = new ArrayBuffer(wbout.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf); //create uint8array as viewer
      for (var i = 0; i < wbout.length; i++)
        view[i] = wbout.charCodeAt(i) & 0xff; //convert to octet

      saveAs(
        new Blob([buf], { type: "application/octet-stream" }),
        "History.xlsx"
      );
      swal.close();
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: grey;
  color: black;
  text-align: center;
  opacity: 0.8;
}
</style>
