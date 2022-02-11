import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [newTodoName, setNewTodoName] = useState("")
  const addTodoInputRef = useRef(null)

  useEffect(async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/task-list/")
    setData(data.data)
    setIsLoading(false)
  }, [])

  const addTask = async () => {
    await axios.post("http://127.0.0.1:8000/api/task-create/", {
      title: addTodoInputRef.current.value,
      completed: false
    })
    const newData = await axios.get("http://127.0.0.1:8000/api/task-list/")
    setData(newData.data)
    addTodoInputRef.current.value = ""
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/task-delete/${id}`)
    const newData = await axios.get("http://127.0.0.1:8000/api/task-list/")
    setData(newData.data)
  }

  const changoTodoCompleted = async (id, title, completed) => {
    await axios.post(`http://127.0.0.1:8000/api/task-update/${id}`, {
      id: id,
      title: title, completed: !completed
    })
    const newData = await axios.get("http://127.0.0.1:8000/api/task-list/")
    setData(newData.data)
  }

  const editTodo = async (id) => {
    await axios.post(`http://127.0.0.1:8000/api/task-update/${id}`, {
      id: id,
      title: newTodoName, completed: false
    })
    const newData = await axios.get("http://127.0.0.1:8000/api/task-list/")
    setData(newData.data)
    setIsEditing(false)
    setNewTodoName("")
  }

  return (
    <div className="App">
      <h1>django todo</h1>
      <input type="text" ref={addTodoInputRef} placeholder='new todo' />
      <button onClick={addTask}>add todo</button>
      <ul>
        {isLoading ? "loading..." : data.map((todo) => {
          const { id, title, completed } = todo
          return (
            <>
              <li onClick={() => changoTodoCompleted(id, title, completed)} key={id} style={{ textDecoration: completed ? 'line-through' : "" }}>{title}</li>
              <button onClick={() => handleDelete(id)}>delete</button>
              {isEditing ?
                <>
                  <input placeholder='new name' onChange={(e) => setNewTodoName(e.target.value)} type="text" />
                  <button onClick={() => editTodo(id)}>save</button>
                </>
                : <button onClick={() => setIsEditing(true)}>edit</button>}
            </>
          )
        })}
      </ul>
    </div>
  );
}