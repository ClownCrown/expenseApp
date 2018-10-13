<template>
  <div id="app" class="ui main container center aligned">
    <Slide noOverlay >
      <a onclick="introJs().start();">
        <i class="yellow question circle outline icon"/>
        <span>Help</span>
      </a>
      <a @click="exportExcel()">
        <i class="green file excel circle outline icon"/>
        <span>Export to Excel sheet</span>
      </a>
    </Slide>
    
    <h1 class="ui center aligned header">ExpenseApp</h1>
    <a href="https://icons8.com">Icon pack by Icons8</a>

    <IncomeInput />

    <ButtonNavBar v-if="expenseList.length > 0"/>

    <ExpenseAddition v-if="totalIncome > 0"/>
    
    <div class="ui centered cards">
      <ExpenseListItem 
        v-for="exp in expenseList"
        v-bind:key="exp.id"
        :expProp="exp"/>

    </div>
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
//import JsonExcel from "vue-json-excel";
import XLSX from "xlsx";
import Download from "downloadjs";
import { Slide } from "vue-burger-menu";

export default {
  name: "App",
  data() {
    return {
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
      }
      return this.$store.state.expensesList;
    },

    totalIncome() {
      if (this.$store.state.totalIncome > 0) {
        localStorage.setItem("totalIncome", this.$store.state.totalIncome);
      }
      return this.$store.state.totalIncome;
    }
  },
  methods: {
    exportExcel() {
      let wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Export History - " + new Date(),
        Subject: "Test",
        Author: "ExpenseManager",
        CreatedDate: new Date()
      };

      wb.SheetNames.push("Month");

      let expenseListForExcel = [];
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
    }
  }
};
</script>

<style>
</style>
