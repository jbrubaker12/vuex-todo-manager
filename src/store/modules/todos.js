import axios from 'axios';

const state = {
    todos: [
        {
            id: 1,
            title: 'Todo One'
        },
        {
            id: 2,
            title: 'Todo Two'
        },
    ],
};

const getters = {
    // Get all of the todos from the state
    allTodos: (state) => state.todos
};

const actions = {
    // Actions are to retrieve/post/put/etc data from a REST API / API

    // After an action is added we need to add the action to our state which is done through a mutation
    // GET
    async fetchTodos({commit}) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        
        // commit is used to call the setTodos mutation and pass in the response from the api
        commit('setTodos', response.data)
    },

    // Action to add a todo with title as a parameter
    // POST
    async addTodo({commit}, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false })

        commit('newTodo', response.data)
    },

    // Action to delete a todo
    // DELETE
    async deleteTodo({commit}, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

        commit('removeTodo', id)
    },

    // Filter the todos
    // GET
    async filterTodos({ commit }, limit) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        commit('filteredTodos', response.data);
    },

    // Update Todo Status when you update something you use PUT
    // PUT
    async updateTodo({commit}, updTodo) {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo
        )

        commit('updateTodo', response.data)
    }
};

const mutations = {
    // Mutation to update the state with the fetched todos
    setTodos: (state, todos) => (state.todos = todos),

    // Instead of push we use unshift to add the todo to the beginning of the list
    newTodo: (state, todo) => state.todos.unshift(todo),

    // Mutation to remove a todo the method of doing is using the .filter() method which is a common way of removing an item from a list
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),

    // Mutation to filter the todos. As you can see we pass in state and todos as parameters and then say that state.todos = todos. todos is the reponse data passed in from the filterTodos action
    filteredTodos: (state, todos) => state.todos = todos,

    // Mutation to update the todo status
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id)
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
