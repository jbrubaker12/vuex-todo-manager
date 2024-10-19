import Vuex from 'vuex';
import Vue from 'vue';
import todos from './modules/todos';  // Ensure this path is correct

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        todos  // Ensure the module is properly registered
    }
});
