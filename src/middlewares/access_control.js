const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');
const ApiToken = require('../models/api_token');

module.exports = async function accessControl(request, reply) {
  // Exempt Swagger documentation endpoints from access control.
  const reqPath = request.routerPath || request.raw.url;
  if (reqPath && (reqPath.startsWith('/documentation') || reqPath === '/')) {
    return;
  }

  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply.code(401).send({ error: 'Missing or invalid Authorization header' });
    return;
  }
  const token = authHeader.slice(7).trim(); // Remove "Bearer " prefix

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.group_id) {
      reply
        .code(401)
        .send({ error: 'Invalid token payload: missing group_id' });
      return;
    }

    const group = await Auth.findById(payload.group_id);
    if (!group) {
      reply.code(403).send({ error: 'Group not found' });
      return;
    }
    const roles = await Auth.getRoles(payload.group_id);
    const apiToken = await ApiToken.findByToken(token);

    if (!apiToken) {
      reply.code(403).send({ error: 'Api token not found' });
      return;
    }

    if (new Date(apiToken.expired_at).getTime() < Date.now()) {
      reply.code(403).send({ error: 'Api token expired' });
      return;
    }

    request.user = {
      group_id: payload.group_id,
      group,
      roles,
      api_token_id: apiToken.api_token_id,
    };

    const reqPath = request.routerPath || request.raw.url;
    const reqMethod = request.method.toUpperCase();

    let allowed = false;
    for (const role of roles) {
      let accessRules = [];
      try {
        accessRules =
          typeof role.role_access === 'string'
            ? JSON.parse(role.role_access)
            : role.role_access;
      } catch (e) {
        continue;
      }
      for (const rule of accessRules) {
        const endpointMatches =
          rule.endpoint === '*' || reqPath.startsWith(rule.endpoint);
        const methodMatches =
          rule.method === '*' || rule.method.toUpperCase() === reqMethod;
        if (endpointMatches && methodMatches) {
          allowed = true;
          break;
        }
      }
      if (allowed) break;
    }

    if (!allowed) {
      reply.code(403).send({ error: 'Forbidden: insufficient permissions' });
      return;
    }
  } catch (err) {
    reply.code(401).send({ error: 'Invalid token', details: err.message });
    return;
  }
};
