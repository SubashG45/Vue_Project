import {createStore} from "vuex"
const store = createStore({
    state:{
        user: {
            name: 'Ashok',
            token: 123
        }
    },
    getters:{},
    mutations:{},
    actions:{},
    modules:{}
})

export default store;