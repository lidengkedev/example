import { useState } from 'react'
import './App.css'
import ToDoItem from './components/todo-item'
import ToDoContainer from './components/todo-container'
import TodoFilter from './components/todo-filter'
import { STATUS } from './config/status'

function App() {
  const [ todos, setTodos ] = useState([])
  const [filterStatus, setFilterStatus] = useState(`${STATUS.IS_CREATE},${STATUS.IS_DONE}`)
  const handleSubmit = (todoItem) => {
    console.log('App---create',todoItem)
    setTodos([ ...todos, todoItem ])
  }
  const handleOperate = (todoItem) => {
    const newTodos = todos.filter(item => item.id !== todoItem.id)
    newTodos.push(todoItem)
    setTodos(newTodos)
    console.log('App---done', todos)
  }
  const handleFilterChange = (value) => {
    setFilterStatus(value)
  }

  return (
    <div className="todo-app">
      <h2 className="todo-title">代办清单</h2>
      <ToDoItem onSubmit={handleSubmit}></ToDoItem>
      <TodoFilter filterStatus={filterStatus} onFilterStatus={handleFilterChange}></TodoFilter>
      <ToDoContainer todos={todos} filterStatus={filterStatus} onOperate={handleOperate}></ToDoContainer>
    </div>
  )
}

export default App
