<template>
    <CalculatorApp></CalculatorApp>
</template>

<script>
import CalculatorApp from '@/components/CalculatorApp.vue'

export default {
  name: 'App',
  components: {
    CalculatorApp
  }
}
</script>

<style>
#box{
  display: grid;
  grid-template-columns: auto auto;
  width: 50%;
  margin: auto;
}
</style>