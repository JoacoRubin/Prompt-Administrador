import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Mic, Square, CheckCircle, XCircle, Trash2, Edit2 } from "lucide-react";
import { apiCall, logout } from "../utils/auth";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

export function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const addTask = useCallback(async (text) => {
    if (!text.trim()) return;
    
    try {
      const newTask = await apiCall('/tasks', {
        method: 'POST',
        body: JSON.stringify({ text: text.trim() })
      });
      setTasks((prev) => [...prev, newTask]);
      setNewTaskText("");
    } catch (error) {
      console.error("Error al crear tarea:", error.message);
    }
  }, []);

  const { isListening, toggle } = useSpeechRecognition({
    onResult: addTask,
    lang: 'es-AR'
  });

  const fetchingTasks = async () => {
    try {
      const data = await apiCall('/tasks');
      setTasks(data.data || data || []);
    } catch (error) {
      console.error("Error al obtener tareas:", error.message);
    }
  };

  useEffect(() => {
    fetchingTasks();
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTaskText);
  };

  const toggleTask = async (id, currentDone) => {
    try {
      const updatedTask = await apiCall(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: !currentDone })
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiCall(`/tasks/${id}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error.message);
    }
  };

  const deleteAllTasks = async () => {
    try {
      await Promise.all(tasks.map(task => 
        apiCall(`/tasks/${task._id}`, { method: 'DELETE' })
      ));
      setTasks([]);
      setShowDeleteAllModal(false);
    } catch (error) {
      console.error("Error al eliminar todas las tareas:", error.message);
    }
  };

  const updateTask = async (id, newText) => {
    try {
      const updatedTask = await apiCall(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ text: newText })
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error al actualizar tarea:", error.message);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <nav className="nav">
          <Link to="/tutorial" className="nav-link">¿Cómo se usa?</Link>
          <Link to="/mis-tareas" className="nav-link">Mis tareas</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
        <button onClick={logout} className="btn btn-secondary">
          Cerrar sesión
        </button>
      </header>
      
      <div className="home-header">
        <h1 className="home-title">🎯 Mis Tareas</h1>
        <p className="home-subtitle">Gestiona tus tareas de forma inteligente con voz o texto</p>
      </div>

      <div className="home-container">
        <div>
          <div className="input-section">
            <form onSubmit={handleAddTask} className="input-group">
              <input
                type="text"
                className="task-input"
                placeholder="Escribe una nueva tarea o usa el micrófono..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              />
              <button type="submit" className="btn-add">
                Agregar
              </button>
              <button
                type="button"
                onClick={toggle}
                className={`btn-voice ${isListening ? 'recording' : ''}`}
                title={isListening ? 'Detener grabación' : 'Iniciar grabación'}
              >
                {isListening ? <Square size={20} /> : <Mic size={20} />}
              </button>
            </form>
          </div>

          <div className="tasks-section">
          <div className="tasks-header">
            <h2 className="tasks-title">Tareas ({tasks.length})</h2>
            {tasks.length > 0 && (
              <button 
                onClick={() => setShowDeleteAllModal(true)} 
                className="btn-delete-all"
              >
                Eliminar Todas
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="no-tasks">
              <div className="no-tasks-icon">📝</div>
              <p className="no-tasks-text">No hay tareas aún. ¡Agrega una!</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task._id} className={`task-card ${task.done ? 'completed' : ''}`}>
                  <div className="task-content">
                    <div className="task-info">
                      {editingTask === task._id ? (
                        <input
                          type="text"
                          defaultValue={task.text}
                          onBlur={(e) => updateTask(task._id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') updateTask(task._id, e.target.value);
                            if (e.key === 'Escape') setEditingTask(null);
                          }}
                          autoFocus
                          className="task-input"
                        />
                      ) : (
                        <>
                          <p className={`task-text ${task.done ? 'completed' : ''}`}>
                            {task.text}
                          </p>
                          <p className="task-date">
                            {new Date(task.createdAt).toLocaleDateString('es-AR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => toggleTask(task._id, task.done)}
                        className="btn-task btn-complete"
                        title={task.done ? "Marcar como pendiente" : "Marcar como completada"}
                      >
                        {task.done ? <XCircle size={20} /> : <CheckCircle size={20} />}
                      </button>
                      <button
                        onClick={() => setEditingTask(task._id)}
                        className="btn-task btn-edit"
                        title="Editar tarea"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="btn-task btn-delete"
                        title="Eliminar tarea"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>

      {showDeleteAllModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteAllModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">⚠️ Confirmar eliminación</h3>
            <p className="modal-text">
              ¿Estás seguro que deseas eliminar todas las tareas? Esta acción no se puede deshacer.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteAllModal(false)}
                className="modal-button modal-button-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={deleteAllTasks}
                className="modal-button modal-button-confirm"
              >
                Eliminar Todas
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2026 JrubinsteinApp – Administrador de Tareas por Voz</p>
      </footer>
    </div>
  );
}
