import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import {saveTodoWithAxiosClient} from "../lib/service";

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
          todos: this.state.todos.concat(data)
        }))
  }

  render () {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            <TodoForm
                currentTODO={this.state.currentTODO}
                handleTODOSubmit={this.handleTODOSubmit} // add handlers
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
