import React, { useState, useEffect } from 'react'

const App = () => {
  // Initialize state with data from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [input, setInput] = useState('')

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, completed: false }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Task Manager
          <span className="block mt-1 text-sm font-normal text-gray-400">Keep track of your tasks</span>
        </h1>
        
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-700 text-white placeholder-gray-400 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add a new task..."
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <div 
              key={todo.id}
              className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg group hover:bg-gray-700 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800 bg-gray-700"
                />
                <span className={`${
                  todo.completed 
                    ? 'line-through text-gray-400' 
                    : 'text-gray-100'
                  } transition-all duration-200`}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App