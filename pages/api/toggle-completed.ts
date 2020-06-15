import { NextApiRequest, NextApiResponse } from 'next';

const sendQuery = require('./utils/_send-query');

const TOGGLE_DONE = `
  mutation($id: ID!, $text: String!, $completed: Boolean!) {
    updateTodo(id: $id, data: {text: $text, completed: $completed}) {
      _id
      completed
    }
  }
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, text, completed } = req.body;
  const { data, errors } = await sendQuery(TOGGLE_DONE, {
    id,
    text,
    completed,
  });
  if (errors) {
    res.statusCode = 500;
    res.json({
      body: errors,
    });
  } else {
    res.statusCode = 200;
    res.json({
      body: { updatedTodo: data.updateTodo },
    });
  }
};
