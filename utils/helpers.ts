export const getApiDomainFromContext = (context) =>
  context.req.headers.referer.split('/').slice(0, 3).join('/');
