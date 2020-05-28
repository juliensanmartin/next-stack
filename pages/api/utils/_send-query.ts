export {}; // silence this error: All files must be modules when the '--isolatedModules' flag is provided.
require('dotenv').config();
const axios = require('axios');

module.exports = async (query, variables) => {
  const result = await axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_SECRET}`,
    },
    data: {
      query,
      variables,
    },
  });

  return result.data;
};
