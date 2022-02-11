import React from 'react'
import { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import axios from 'axios'

export const TodoList = () => {
    const [todos, setTodos] = useState([])

    const fetchData = async() => {
        const results = await axios.get("http://127.0.0.1:8000/api/task-list/")
        setTodos(results.data)
    }

    useEffect(()=> {
        fetchData()
    }, [])
    
    const addTodo = async(todo) => {
        await axios.post("http://127.0.0.1:8000/api/task-create/", {
            title: todo.text,
            completed: false
        })
        fetchData()
    }

    const removeTodo = async(id) => {
        await axios.delete(`http://127.0.0.1:8000/api/task-delete/${id}`)
        fetchData()
    }

    const updateTodo = async(todoId, newValue) => {
        await axios.post(`http://127.0.0.1:8000/api/task-update/${todoId}`, {
            id: todoId,
            title: newValue.text
        })
        fetchData()
    }

    return (
        <div>
            <h1>What`s your plan for today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos = {todos} removeTodo={removeTodo} updateTodo={updateTodo} />
        </div>
    )
}
