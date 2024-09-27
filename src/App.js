import React, { Component } from "react";
import "./App.css";
import { Task } from "./components/tasks/task.component";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      newTaskDescription: "",
    };
  }
  componentDidMount() {
    const storedTask = localStorage.getItem("tasks");
    if (storedTask) {
      this.setState({ tasks: JSON.parse(storedTask) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  //method to handle input change
  handleInputChange = (event) => {
    this.setState({ newTaskDescription: event.target.value });
  };

  //Method to add new Task
  addTask = () => {
    if (this.state.newTaskDescription.trim() === "") {
      return;
    }

    const newTask = {
      id: this.state.tasks.length + 1,
      description: this.state.newTaskDescription.trim(),
      completed: false,
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      newTaskDescription: "",
    }));
  };
  //method to toggle task completion
  toggleTaskCompletion = (id) => {
    const updatedTasks = this.state.tasks.map((task) => {
      console.log(task.id, id, task.id === id);
      return task.id === id ? { ...task, completed: !task.completed } : task;
    });
    console.log("updated task",updatedTasks)
    this.setState({ tasks: updatedTasks });
   
  };
  deleteTask = (id) => {
    const filterdTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: filterdTasks });
  };

  render() {
    const sortedTasks = this.state.tasks.sort((a,b) => a.completed - b.completed) 
    return (
      <div className="App">
        <Task
          tasks={sortedTasks}
          newTaskDescription={this.state.newTaskDescription}
          handleInputChange={this.handleInputChange}
          addTask={this.addTask}
          toggleTaskCompletion={this.toggleTaskCompletion}
          deleteTask={this.deleteTask}
        />
      </div>
    );
  }
}
export default App;
