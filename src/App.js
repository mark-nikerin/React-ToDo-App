import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal"

const AddToDo = React.lazy(() => import("./Todo/AddToDo"));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addToDo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Simple To Do App</h1>
        <Modal /> 
        <React.Suspense fallback={<Loader />}>
          <AddToDo onCreate={addToDo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo}></TodoList>
        ) : loading ? null : (
          <p>No Todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
