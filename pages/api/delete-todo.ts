import { NextApiRequest, NextApiResponse } from 'next';

const sendQuery = require('./utils/_send-query');

const DELETE_TODO = `
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  const { data, errors } = await sendQuery(DELETE_TODO, { id });

  if (errors) {
    res.statusCode = 500;
    res.json({
      body: errors,
    });
  } else {
    res.statusCode = 200;
    res.json({
      body: { deletedTodo: data.deleteTodo },
    });
  }
};
