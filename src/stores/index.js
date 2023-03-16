import { createStore } from 'vuex'

export default createStore({
    state: {
        name: "",
        email: "",
        token: null
    },
    getters: {
    },
    mutations: {
        SET_NAME(state, name){
            state.name = name
        },

        SET_EMAIL(state, email){
            state.email = email
        },

        SET_TOKEN(state, token){
            state.token = token
        }
    },
    actions: {
        login({commit}, token){
            commit("SET_TOKEN", token)
        }
    },
    modules: {
    }
})