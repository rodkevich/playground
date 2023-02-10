import axios from 'axios'

export const saveTodoWithAxiosClient = (todo) =>
    // axios is a lib for http requests
    axios.post('http://locahost:3030/api/todos', todo)

export const loadTODOs =() =>
    axios.get('http://locahost:3030/api/todos')