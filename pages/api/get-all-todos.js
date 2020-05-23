const sendQuery = require('../../server/utils/send-query');

const GET_ALL_TODOS = `
    query {
        allTodos {
        data {
            _id,
            text,
            completed
        }
        }
    }
`;

export default async (req, res) => {
  const { data, errors } = await sendQuery(GET_ALL_TODOS);

  if (errors) {
    res.statusCode = 500;
    res.json({
      body: errors,
    });
  } else {
    res.statusCode = 200;
    res.json({
      body: { todos: data.allTodos.data },
    });
  }
};
