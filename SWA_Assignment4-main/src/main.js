import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(Vuex)
app.mount('#app')
//Q9 initializing the gloabal state and providing the method to modify the state
export const store = new Vuex.Store({
    state: {
        message: 'Hello World'
    },
    mutations: {
        updateMessage(state, newMessage) {
            state.message = newMessage
        }
    }
})
