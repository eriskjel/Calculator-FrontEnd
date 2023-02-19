
<template>
  <div class="body">
    <form @submit.prevent="sendForm" class="form">
      <h1>Contact us</h1>
      <BaseInput id="inpName" class="input-container" type="text" label="Name" v-model="form.name"/>
      <BaseInput id="inpEmail" class="input-container" type="text" label="Email" v-model="form.email"/>
        <div>
          <textarea id="message" name="message" rows="6" class="input" placeholder="Message" v-model="form.message"></textarea>
          <div class="cut"></div>
        </div>
        <button :disabled="isDisabled" id="button">Send</button>
    </form>
  </div>
</template>

<script>
  import BaseInput from "@/components/BaseInput.vue";
  import { postContactForm } from "../../utils/httputils";
  import { v4 as uuidv4 } from 'uuid';


  export default {
      // eslint-disable-next-line no-unused-vars


    name: 'ContactForm',
    components: {BaseInput},
    data() {
      return {
        form:{
          id: "",
          name: "",
          email: "",
          message: ""
        }
      }
    },
    methods: {
      sendForm() {
        if (!this.isDisabled){
          this.$store.commit("SET_NAME",this.form.name);
          this.$store.commit("SET_EMAIL",this.form.email);

          const form = {
            ...this.form,
            id: uuidv4(),
          }
          postContactForm(form)
              .then(response => {
                this.form.name = "";
                this.form.email = "";
                this.form.message = "";

                this.form.name = this.$store.state.name;
                this.form.email = this.$store.state.email;



                console.log("Response", response);
              })
              .catch(error => {
                console.log(error);
              });
        }
        else{
          alert("An error occurred");
        }

    },
      validateEmail() {
        if (typeof this.form.email !== 'string' || this.form.email.length < 0) return false;

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(this.form.email)) return "This field must be a valid email";

        return true;
      },

      validateName() {
        return (typeof this.form.name === 'string' && this.form.name.length > 0)
      },

      validateForm() {
        if (this.validateName() !== true) {
          console.log("First name is not valid")
          return false;
        }

        if (this.validateEmail() !== true) {
          console.log("Email is not valid")
          return false;
        }
        return this.form.message;
      },
  },
    computed:{
      isDisabled(){
        console.log(this.validateForm())
        return !this.validateForm();

      }
    },
    created() {
      this.form.name = this.$store.state.name;
      this.form.email = this.$store.state.email;
    }
  }
</script>


<style scoped>

  .body {
    background-color: rgb(124, 121, 121);
  }

  h1{
    color: white;
    text-align: center;
    font-size: 40px;
    font-weight: 300;
  }

  textarea{
    resize: none;
    margin-top: 20px;
  }
  .form {
    margin: 50px auto 0 auto;
    width: 400px;
    height: fit-content;
    background-image: linear-gradient(to bottom right, rgb(92, 88, 88), rgb(37, 33, 33));
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .input-container {
    margin-top: 40px;
    height: 50px;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .input{
    background-color: rgb(92, 88, 88);
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
  }

  .cut{
    background-color: rgba(92, 88, 88,0);
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 76px;
  }

  .input:focus ~ .cut,
  .input:not(:placeholder-shown) ~ .cut {
    transform: translateY(8px);
    background-color: rgba(92, 88, 88,1);
  }

  .placeholder {
    color: white;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
  }

  ::placeholder {
    color: white;
  }

  .input:focus ~ .placeholder,
  .input:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
  }

  .input:not(:placeholder-shown) ~ .placeholder {
    color: #808097;
  }

  .input:focus ~ .placeholder {
    color: white;
  }

  #button {
    background: linear-gradient(45deg, #FC466B, #3F5EFB);
    border: 0;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    font-size: 18px;
    height: 50px;
    margin-top: 40px;
    outline: 0;
    width: 100%;
    transition: transform 200ms;
  }

  #button:hover {
    transform: scale(1.05);
  }

  #button:disabled{
    cursor: initial;
    transform: scale(1);
  }
</style>