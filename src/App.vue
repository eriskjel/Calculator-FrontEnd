<template>
  <nav class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/contact-form">Contact form</router-link>
  </nav>
  <router-view/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}

.nav{
  height: 50px;
  background-image: linear-gradient(to bottom right, rgb(92, 88, 88), rgb(37, 33, 33));
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 15px;
}

.nav a{
  text-decoration: none;
  color: white;
  margin: 0 10px;
}

.nav a:hover{
  transform: scale(1.1);
}


body{
  background-color: rgb(124, 121, 121);
}

</style>

