// hooks/useTasks.js - Custom hook para gestión de tareas
import { useState, useEffect, useCallback } from 'react'
import { tasksService } from '../services/api'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await tasksService.getAll()
      setTasks(data)
    } catch (err) {
      setError(err.message)
      console.error('Error al obtener tareas:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = async (text) => {
    try {
      const newTask = await tasksService.create(text)
      setTasks(prev => [...prev, newTask])
      return { success: true }
    } catch (err) {
      console.error('Error al crear tarea:', err)
      return { success: false, error: err.message }
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await tasksService.update(id, updates)
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task))
      return { success: true }
    } catch (err) {
      console.error('Error al actualizar tarea:', err)
      return { success: false, error: err.message }
    }
  }

  const deleteTask = async (id) => {
    try {
      await tasksService.delete(id)
      setTasks(prev => prev.filter(task => task._id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error al eliminar tarea:', err)
      return { success: false, error: err.message }
    }
  }

  const deleteAllTasks = async () => {
    try {
      const taskIds = tasks.map(t => t._id)
      await tasksService.deleteAll(taskIds)
      setTasks([])
      return { success: true }
    } catch (err) {
      console.error('Error al eliminar todas las tareas:', err)
      return { success: false, error: err.message }
    }
  }

  const toggleTask = async (id, currentDone) => {
    return updateTask(id, { done: !currentDone })
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    toggleTask,
    refetch: fetchTasks
  }
}
