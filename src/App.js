import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import {
  setTasks,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  setNewTaskDescription
} from "./redux/task/task.actions";
import "./App.css";
import Task from "./components/tasks/task.component";
import Header from "./components/header/header.component";
import SignIn from "./components/signIn/sign-in.component";
import SignUp from "./components/signUp/sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { getDoc } from "firebase/firestore";

class App extends Component {
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          this.props.setCurrentUser({
            id: userSnapshot.id,
            ...userSnapshot.data(),
          });
        }
      } else {
        this.props.setCurrentUser(null); // Handle signed-out user
      }
    });

    // Fetch tasks from localStorage
    const storedTask = localStorage.getItem("tasks");
    if (storedTask) {
      this.props.setTasks(JSON.parse(storedTask)); // Set tasks via Redux
    }
  }

  componentWillUnmount() {
    // Unsubscribe from auth listener
    this.unsubscribeFromAuth();
  }

  componentDidUpdate(prevProps) {
    // Sync tasks with localStorage whenever tasks change
    if (prevProps.tasks !== this.props.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.props.tasks));
    }
  }

  handleInputChange = (event) => {
    this.props.setNewTaskDescription(event.target.value);
  };

  addTask = () => {
    if (this.props.newTaskDescription.trim() === "") {
      return;
    }

    const newTask = {
      id: this.props.tasks.length + 1,
      description: this.props.newTaskDescription.trim(),
      completed: false,
    };

    this.props.addTask(newTask); // Add task via Redux
    this.props.setNewTaskDescription(""); // Clear input field
  };

  toggleTaskCompletion = (id) => {
    this.props.toggleTaskCompletion(id); // Toggle task completion via Redux
  };

  deleteTask = (id) => {
    this.props.deleteTask(id); // Delete task via Redux
  };

  render() {
    const { currentUser, tasks = [], newTaskDescription } = this.props;

    const sortedTasks = tasks.sort((a, b) => a.completed - b.completed);

    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Task
                  tasks={sortedTasks}
                  newTaskDescription={newTaskDescription}
                  handleInputChange={this.handleInputChange}
                  addTask={this.addTask}
                  toggleTaskCompletion={this.toggleTaskCompletion}
                  deleteTask={this.deleteTask}
                />
              }
            />
            <Route
              path="/signin"
              element={currentUser ? <Navigate to="/" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={currentUser ? <Navigate to="/" /> : <SignUp />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  tasks: state.task.tasks,
  newTaskDescription: state.task.newTaskDescription,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setTasks: (tasks) => dispatch(setTasks(tasks)),
  addTask: (task) => dispatch(addTask(task)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  toggleTaskCompletion: (taskId) => dispatch(toggleTaskCompletion(taskId)),
  setNewTaskDescription: (description) => dispatch(setNewTaskDescription(description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
