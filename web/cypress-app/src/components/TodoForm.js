import React from 'react'

export default props =>
  <form onSubmit={props.handleTODOSubmit}>
    <input
      type='text'
      autoFocus
      value={props.currentTODO}
      // use component
      onChange={props.handleNewTODOChange}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
