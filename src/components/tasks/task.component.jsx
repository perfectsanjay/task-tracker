import React from "react";
import "./task.component.style.scss";

export const Task = (props) => {
  const {
    tasks,
    handleInputChange,
    newTaskDescription,
    addTask,
    toggleTaskCompletion,
    deleteTask,
  } = props;
  return (
    <div className="container">
      <div className="sub-container">
        <h1>Task Tracker</h1>
        <div className="input-container">
          <input
            className="text-field"
            type="text"
            placeholder="Start writing and press enter to create task"
            value={newTaskDescription}
            onChange={handleInputChange}
          />
          <button className="button-field" type="button" onClick={addTask}>
            Create
          </button>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="checkbox-container">
              <input
                className="checkBox"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <p className={task.completed ? "completed-task" : ""}>
                {task.description}
              </p>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
