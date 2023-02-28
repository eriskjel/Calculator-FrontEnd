<template>
  <div id="box">
  <div id="container">
    <div class="parent">
        <div id="result" class="div12">
            <p class="blinking-cursor">{{ currentNumber || "|" }}</p>
        </div>
        <div @click="clear()" data-test="clear2" id="clear" class="div14">C</div>
        <div @click="ans()" class="div15">ANS</div>
        <div @click="del()" class="div10">DEL</div>
        <div class="div1 btn"><button id="button1" data-test="button1" @click="append(1)">1</button></div>
        <div class="div2 btn"><button id="button2" @click="append(2)">2</button></div>
        <div class="div3 btn"><button id="button3" @click="append(3)">3</button></div>
        <div class="div4 btn"><button id="button4" @click="append(4)">4</button></div>
        <div class="div5 btn"><button data-test="button5Test" id="button5" @click="append(5)">5</button></div>
        <div class="div6 btn"><button id="button6" @click="append(6)">6</button></div>
        <div class="div13 btn"><button data-test="multiplyTest" id="multiply" @click="operation('*')">*</button></div>
        <div class="div7 btn"><button id="button7" @click="append(7)">7</button></div>
        <div class="div8 btn"><button id="button8" @click="append(8)">8</button></div>
        <div class="div9 btn"><button id="button9" @click="append(9)">9</button></div>
        <div class="div0 btn"><button id="button0" @click="append(0)">0</button></div>
        <div class="div11 btn"><button id="add" @click="operation('+')">+</button></div>
        <div class="div16 btn"><button id="subtract" @click="operation('-')">-</button></div>
        <div class="div17 btn"><button id="divide" @click="operation('/')">/</button></div>
        <div class="div18"></div>
        <div @click="append(',')" class="comma btn" id="commaDiv">,</div>
        <div class="div21"><button data-test="calculateTest" id="calculate" @click="calculateAPI()">=</button></div>
        </div>
    </div>
    <div id="logContainer">
      <div class="log-box">
        <div id="header" class="historyTitle">{{ logBoxTitle }}</div>
        <div id="historyContent">
          <div v-for="h in history" :key="h">
            <div class="history">{{h}}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>


<script>
import { postCalcSolve } from "../../utils/httputils";
//import { getAnswer } from "../../utils/httputils";
export default {
  name: "CalculatorApp",
  data()
  {
    return {
      previousNumber: "",
      currentNumber: "",
      operationProperty: false,
      operator: "",
      result: 0,
      history: [],
      logBoxTitle: "HistoryBox",
    }
  },
  methods: {
        append(number) {
            if(this.operationProperty === true){
                this.currentNumber = "";
                this.operationProperty = false;
            }

            this.currentNumber = this.currentNumber + number;
        },

        clear(){
            this.currentNumber = "";
            this.previousNumber = "";
            this.result = 0;

        },

        ans(){
            this.currentNumber = this.result;
        },

        operation(operator){
            this.operationProperty = true;
            if (this.operator === "*"){
              this.operator = operator;
            }
            this.operator = operator;
            this.previousNumber = this.currentNumber;
            this.currentNumber = "";
        },

        calculateAPI(){
          const equation = {
            n1: this.previousNumber,
            n2: this.currentNumber,
            operator: this.operator.charAt(0)
          };
            postCalcSolve(equation).then((response) => {
                this.result = response.data;
                this.appendToHistory();
            }).catch((error) => {
                console.log(error);
            });
        },

        calculate(){
            if (this.previousNumber === "" || this.currentNumber === "" || this.operator === ""){
                return;
            }
            if (this.operator === "/" && this.currentNumber === "0"){
                alert("You can't divide by zero!");
                return;
            }
            if (!(this.operator === "+" || this.operator === "-" || this.operator === "*" || this.operator === "/")){
                return;
            }
            if(this.operator === "+"){
                //console.log("previous number: " + this.previousNumber + " current number: " + this.currentNumber + " result: " + this.result);
                this.result = parseFloat(this.previousNumber) + parseFloat(this.currentNumber);
            }
            else if(this.operator === "-"){
                this.result = parseInt(this.previousNumber) - parseInt(this.currentNumber);
            }
            else if(this.operator === "*"){
                this.result = parseInt(this.previousNumber) * parseInt(this.currentNumber);
            }
            else if(this.operator === "/"){
                this.result = parseInt(this.previousNumber) / parseInt(this.currentNumber);
            }
            this.operationProperty = true;
            this.appendToHistory();
        },

        appendToHistory(){
            this.history.push(this.previousNumber + " " + this.operator + " " + this.currentNumber + " = " + this.result);
            this.currentNumber = this.result;
        },

        del(){
            this.currentNumber = this.currentNumber.slice(0, -1);
        }
    }
}
</script>


<style>
#container {
  width: 70%;
  height: 500px;
  background-image: linear-gradient(to bottom right, rgb(92, 88, 88), rgb(37, 33, 33));
  border: solid thin gray;
  margin: 50px;
  box-shadow: rgb(104, 99, 99) 0px 0px 10px 0px;
  border-radius: 15px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: rgb(104, 99, 99) 0px 0px 10px 0px;
}

#result {
  text-align: right;
  justify-content: right;
  padding-right: 15px;
}

#result:hover {
  cursor: default;
  color: white;
  background-color: white;
}


.parent div {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.parent div:hover {
  background-color: white;
  color: rgb(98, 98, 98);
  cursor: pointer;
}

div button{
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  width: 100%;
  height: 100%;
}

div button:hover{
  color: rgb(98, 98, 98);
  cursor: pointer;
}

.div12 {
  grid-area: 1 / 1 / 2 / 5;
  border-radius: 15px 15px 0 0;
  background-color: rgb(26, 12, 12) !important;
}

.div14 {
  grid-area: 2 / 1 / 3 / 2;
}

.div15 {
  grid-area: 2 / 2 / 3 / 3;
}

.div10 {
  grid-area: 2 / 3 / 3 / 4;
}

.div11 {
  grid-area: 2 / 4 / 3 / 5;
}

.div1 {
  grid-area: 3 / 1 / 4 / 2;
}

.div2 {
  grid-area: 3 / 2 / 4 / 3;
}

.div3 {
  grid-area: 3 / 3 / 4 / 4;
}

.div16 {
  grid-area: 3 / 4 / 4 / 5;
}

.div4 {
  grid-area: 4 / 1 / 5 / 2;
}

.div5 {
  grid-area: 4 / 2 / 5 / 3;
}

.div6 {
  grid-area: 4 / 3 / 5 / 4;
}

.div13 {
  grid-area: 4 / 4 / 5 / 5;
}

.div7 {
  grid-area: 5 / 1 / 6 / 2;
}

.div8 {
  grid-area: 5 / 2 / 6 / 3;
}

.div9 {
  grid-area: 5 / 3 / 6 / 4;
}

.div17 {
  grid-area: 5 / 4 / 6 / 5;
}

.div18 {
  grid-area: 6 / 1 / 7 / 2;
  border-radius: 0 0 0 15px;
}

.div0 {
  grid-area: 6 / 2 / 7 / 3;
}

.comma {
  grid-area: 6 / 3 / 7 / 4;
}

.div21 {
  grid-area: 6 / 4 / 7 / 5;
  border-radius: 0 0 15px 0;
  background-image: linear-gradient(to bottom right, rgb(210, 24, 24), rgb(207, 102, 22));
}

@media screen and (max-width: 1200px) {
  #box {
    grid-template-columns: auto !important;
  }
}

.historyTitle {
  grid-area: 1 / 3 / 2 / 4;
  color: white;
  margin-top: 20px;

}
#historyContent {
  grid-area: 2 / 3 / 3 / 4;
  color: white;
  margin: 40px auto;
}
#logContainer{
  display: flex;
  justify-content: center;
  margin: auto 0;
  height: 500px;
  background-image: linear-gradient(to bottom right, rgb(92, 88, 88), rgb(37, 33, 33));
  border-radius: 15px;
  overflow: auto;
}

#logContainer::-webkit-scrollbar {
  width: 10px;
}

#logContainer::-webkit-scrollbar-track {
  background: rgb(130, 125, 125);
}

#logContainer::-webkit-scrollbar-thumb {
  background: rgb(92, 88, 88);
}

</style>