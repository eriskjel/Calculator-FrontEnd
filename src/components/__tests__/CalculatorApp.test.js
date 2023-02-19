import {test} from 'vitest'
import { expect, it, describe} from "vitest";
import CalculatorApp from "../CalculatorApp.vue"
//import { render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
//import {nextTick} from "vue";
//import calculatorApp from "@/components/CalculatorApp.vue";


/*test("Test that numbers get entered", async () => {
    const wrapper = mount(CalculatorApp);
    await wrapper.setData({
        currentNumber: ""
    })
    //calculatorApp.data().currentNumber = "";

    const button1 = wrapper.find("[data-test='clear2']");
    await button1.trigger("click");
    expect(wrapper.vm.$data.currentNumber).toBe("")

    const button5 = wrapper.find("[data-test='button5Test']")
    await button5.trigger("click");
    expect(wrapper.vm.$data.currentNumber).toBe("5")


    const multiply = wrapper.find("#multiply");
    await multiply.trigger("click");
    expect(wrapper.vm.$data.operator).toBe("*");

    /!*
    await button5.trigger("click");

    const calculate = wrapper.find("#calculate");
    await calculate.trigger("click");


    expect(wrapper.vm.$data.currentNumber).toBe(25);

     *!/
    //expect(calculatorApp.data().operator).toBe("4")
});*/

export default {
    data(){
        return{
            previousNumber: "",
            currentNumber: "",
            operationProperty: false,
            operator: "",
            result: 0,
            history: []
        }
    },
    methods:{
        operation(operator){
            if(this.operator === "+"){
                document.querySelector("#add").style.backgroundColor = "gray";
            }
            else if(this.operator === "-"){
                document.querySelector("#subtract").style.backgroundColor = "gray";
            }
            else if(this.operator === "*"){
                document.querySelector("#multiply").style.backgroundColor = "gray";
            }
            else if(this.operator === "/"){
                document.querySelector("#divide").style.backgroundColor = "gray";
            }
        }
    }
}

describe("CalculatorApp", () => {
    it("should clear the current number when clear button is clicked", async () => {
        const wrapper = mount(CalculatorApp);
        wrapper.vm.$data.currentNumber = "123";

        const clearButton = wrapper.find("[data-test='clear2']");
        await clearButton.trigger("click");

        expect(wrapper.vm.$data.currentNumber).toBe("");
    });

    it("should set the current number to 5 when the number 5 button is clicked", async () => {
        const wrapper = mount(CalculatorApp);

        const numberButton = wrapper.find("[data-test='button5Test']");
        await numberButton.trigger("click");

        expect(wrapper.vm.$data.currentNumber).toBe("5");
    });

    it("should set the operator to multiplication when the multiplication button is clicked", async () => {
        const wrapper = mount(CalculatorApp);

        wrapper.vm.calculate = jest.fn((operator) => {
            this.operationProperty = true;
            if (this.operator === "*"){
                this.operator = operator;
            }
            console.log(operator);
            this.operator = operator;
            this.previousNumber = this.currentNumber;
            this.currentNumber = "";
        })


        expect(wrapper.vm.$data.operator).toBe("*");
    });
});

