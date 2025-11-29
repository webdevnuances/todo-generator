import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./App.module.css";
import Logo from "./assets/remove.svg?react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoCounter, setTodoCounter] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onFormSubmit = (data) => {
    setTodos((prev) => [
      ...prev,
      { id: todoCounter, title: data.title, description: data.description },
    ]);
    setTodoCounter((prev) => prev + 1);
  };

  const _todos = todos.map((todo) => (
    <dl key={todo.id}>
      <dt>
        {todo.title}
        <Logo
          onClick={() => {
            handleRemoveTodo(todo.id);
          }}
          className={styles.delete}
        />
      </dt>
      <dd>{todo.description}</dd>
    </dl>
  ));

  function handleRemoveTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <main className={styles.main}>
      <h1>Todo List Generator</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Must be at least 3 chars" },
          })}
          type="text"
          placeholder="Todo Title"
        />
        {!!errors.title && (
          <p className={styles.error}>{errors.title.message}</p>
        )}
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Must be at least 10 chars" },
          })}
          placeholder="Todo Description"
        ></textarea>
        {!!errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
        <button type="submit" disabled={!isValid}>
          Save me
        </button>
      </form>
      <section className={styles.todo}>
        <h2>Your Current Todos</h2>
        {_todos}
      </section>
    </main>
  );
}
