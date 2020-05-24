const sendQuery = require('./utils/_send-query');

const CREATE_TODO = `
    mutation($text: String!) {
        createTodo(data: {text: $text, completed: false}) {
            _id
            text
            completed
        }
    }
`;

export default async (req, res) => {
  const { data, errors } = await sendQuery(CREATE_TODO, {
    text: req.body.text,
  });

  if (errors) {
    res.statusCode = 500;
    res.json({
      body: errors,
    });
  } else {
    res.statusCode = 200;
    res.json({
      body: { newTodo: data.createTodo },
    });
  }
};
