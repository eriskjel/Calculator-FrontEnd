<template>
  <div>
    <div>
      <button @click="showLoginForm = true">Login</button>
      <button @click="showLoginForm = false">Register</button>
    </div>

    <div v-if="showLoginForm">
      <LoginForm></LoginForm>
    </div>

    <div v-else>
      <RegisterForm></RegisterForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'AuthForm',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      showLoginForm: true
    }
  },
  methods: {
    showLogin() {
      this.showLoginForm = true
    },
    showRegister() {
      this.showLoginForm = false
    }
  }
}
</script>
