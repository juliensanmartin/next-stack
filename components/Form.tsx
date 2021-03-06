import { useState } from 'react';
import axios from 'axios';

const Form = ({ reloadTodos }) => {
  const [text, setText] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text === '') return;
    await axios.post('/api/create-todo', { text });
    setText('');
    reloadTodos();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Add a todo
        <input
          type="text"
          className="input"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></input>
      </label>
      <button className="button">Save Todo</button>
      <style jsx>{`
        .form {
          align-items: flex-end;
          display: flex;
          justify-content: space-between;
          margin: 2rem auto;
          max-width: 500px;
          padding: 0;
        }

        .label {
          color: #666;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-indent: 0.25rem;
          text-transform: uppercase;
          width: 350px;
        }

        .input {
          display: block;
          border: 1px solid #444;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          width: 100%;
          border-radius: 0.25rem;
          box-sizing: border-box;
          font-size: 1.25rem;
          line-height: 2rem;
          padding: 0.25rem;
        }
      `}</style>
    </form>
  );
};

export default Form;
