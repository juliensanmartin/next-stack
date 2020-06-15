import { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';

const Todo = ({ todo, reloadTodos }) => {
  const [isCompleted, setCompleted] = useState(todo.completed);
  const [isDeleting, setDeleting] = useState(false);

  const toggleCompleted = () => {
    setCompleted(!isCompleted);
    axios
      .post('/api/toggle-completed', {
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      })
      .then(reloadTodos);
  };

  const handleDelete = () => {
    setDeleting(true);
    axios
      .post('/api/delete-todo', {
        id: todo._id,
      })
      .then(() => {
        reloadTodos();
      });
  };

  return (
    <>
      <label htmlFor={`todo-toggle-${todo._id}`} className="label">
        Mark Complete
      </label>
      <input
        id={`todo-toggle-${todo._id}`}
        type="checkbox"
        checked={isCompleted}
        onChange={toggleCompleted}
        className={'toggle'}
      />

      <p className={`text ${isCompleted && 'completed'}`}>{todo.text}</p>
      {isDeleting && <Spinner />}

      <label htmlFor={`todo-toggle-${todo._id}`} className="label">
        Delete
      </label>
      <button onClick={handleDelete} className="delete">
        <span role="img" aria-label="delete" title="delete this todo">
          ❌
        </span>
      </button>
      <style jsx>
        {`
          .label {
            /* hidden for screen readers */
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            width: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
          }

          .toggle {
            cursor: pointer;
            margin-right: 1rem;
          }

          .text {
            margin: 0;
            width: 100%;
          }

          .text.completed {
            color: #777;
            text-decoration: line-through;
          }

          .delete {
            background: transparent;
            border: 0;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};
export default Todo;
