import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Form from '../components/Form';
import Todo from '../components/Todo';
import { getApiDomainFromContext } from '../utils/helpers';

const fetcher = async (url) => {
  const res = await fetch(url);
  const { todos } = await res.json();
  return todos;
};

const URL = '/api/get-all-todos';

export async function getServerSideProps(context) {
  const apiDomain = getApiDomainFromContext(context);
  const todos = await fetcher(`${apiDomain}${URL}`);

  return {
    props: { initialTodos: todos },
  };
}

function Todos({ initialTodos }) {
  const { data: swrTodos } = useSWR(URL, fetcher, {
    initialData: initialTodos,
  });
  const [shouldRefresh, refreshPage] = useState(false);
  const [todos, setTodos] = useState(swrTodos);

  useEffect(() => {
    async function loadTodos() {
      const todos = await fetcher(URL);
      setTodos(todos);
    }
    if (!shouldRefresh) return;
    loadTodos();
    refreshPage(false);
  }, [shouldRefresh]);

  const reloadTodos = () => refreshPage(true);

  return (
    <div>
      <h1>Todos</h1>
      <Form reloadTodos={reloadTodos} />
      {todos ? (
        <ul className="todos">
          {todos.map((todo) => (
            <li key={todo._id} className="todo">
              <Todo todo={todo} reloadTodos={reloadTodos} />
            </li>
          ))}
        </ul>
      ) : (
        <span>Refreshing Todos...</span>
      )}
      <style jsx>{`
        .todos {
          border-top: 1px solid #ddd;
          list-style: none;
          margin: 2rem auto;
          max-width: 500px;
          padding: 0;
        }

        .todo {
          align-items: center;
          border-bottom: 1px solid #ddd;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          margin: 0;
          padding: 0.7rem;
          width: 100%;
        }

        .loading {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Todos;
