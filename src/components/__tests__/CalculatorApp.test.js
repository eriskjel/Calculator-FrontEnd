import {test} from 'vitest'
import { expect, it, describe} from "vitest";
import CalculatorApp from "../CalculatorApp.vue"
//import { render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
//import {nextTick} from "vue";
//import calculatorApp from "@/components/CalculatorApp.vue";



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


        const multiplyButton = wrapper.find("[data-test='multiplyTest']");
        await multiplyButton.trigger("click");
        expect(wrapper.vm.$data.operator).toBe("*");
    });

    it("should correctly calculate the result when the calculate button is clicked", async () => {
        const wrapper = mount(CalculatorApp);
        wrapper.vm.$data.currentNumber = "5";
        wrapper.vm.$data.operator = "*";
        wrapper.vm.$data.previousNumber = "5";

        const calculateButton = wrapper.find("[data-test='calculateTest']");
        await calculateButton.trigger("click");

        expect(wrapper.vm.$data.result).toBe(25);
    });
});

