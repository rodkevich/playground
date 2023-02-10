import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import {saveTodoWithAxiosClient, loadTODOs} from "../lib/service";

export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTODO:'',
      todos: []
    }
    this.handleNewTODOChange = this.handleNewTODOChange.bind(this)
    this.handleTODOSubmit= this.handleTODOSubmit.bind(this)
  }

  handleNewTODOChange(evt){
    this.setState({currentTODO: evt.target.value})
  }

  // called for new todos
  handleTODOSubmit(evt) {
    // prevent default behave on fail
    evt.preventDefault()
    // take from state
    const newTODO = {name: this.state.currentTODO, isComplete: false }
    // send item via axios http client
    saveTodoWithAxiosClient(newTODO)
        .then(({data}) => this.setState({
          todos: this.state.todos.concat(data),
          currentTODO: ''
        }))
        .catch(()=>this.setState({error:true}))
  }

  componentDidMount() {
    loadTODOs()
        .then(({data})=>this.setState({todos:data}))
  }

  render () {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error ? <span className='error'>Oh no!</span> : null}

            <TodoForm
                currentTODO={this.state.currentTODO}
                // add handlers ...
                handleTODOSubmit={this.handleTODOSubmit}
                handleNewTODOChange={this.handleNewTODOChange}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} />
          </section>
          <Footer />
        </div>
      </Router>
    )
  }
}
