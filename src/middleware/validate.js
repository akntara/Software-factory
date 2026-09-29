const { AppError } = require('../errors');

function validateBody(parser) {
  return function validateRequestBody(req, res, next) {
    try {
      req.validatedBody = parser(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

function requireObject(body, allowedFields) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new AppError(400, 'Request body must be a JSON object');
  }

  const unexpected = Object.keys(body).filter((key) => !allowedFields.includes(key));
  if (unexpected.length > 0) {
    throw new AppError(400, `Unexpected field(s): ${unexpected.join(', ')}`);
  }
}

function requiredString(body, field) {
  const value = body[field];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError(400, `${field} must be a non-empty string`);
  }
  return value.trim();
}

function optionalString(body, field) {
  if (!Object.hasOwn(body, field)) {
    return undefined;
  }
  return requiredString(body, field);
}

function requiredPassword(body) {
  const value = body.password;
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError(400, 'password must be a non-empty string');
  }
  return value;
}

function parseEmail(value) {
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError(400, 'email must be a valid email address');
  }
  return email;
}

function parseRegistration(body) {
  requireObject(body, ['email', 'password']);
  const email = parseEmail(requiredString(body, 'email'));
  const password = requiredPassword(body);
  if (password.length < 8) {
    throw new AppError(400, 'password must be at least 8 characters');
  }
  return { email, password };
}

function parseLogin(body) {
  requireObject(body, ['email', 'password']);
  return {
    email: parseEmail(requiredString(body, 'email')),
    password: requiredPassword(body)
  };
}

function parseDueDate(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError(400, 'due_date must be a valid date string');
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, 'due_date must be a valid date string');
  }
  return date;
}

function parseTaskCreate(body) {
  requireObject(body, ['title', 'description', 'status', 'due_date']);
  return {
    title: requiredString(body, 'title'),
    description: requiredString(body, 'description'),
    status: optionalString(body, 'status') || 'pending',
    due_date: parseDueDate(body.due_date)
  };
}

function parseTaskUpdate(body, complete = false) {
  requireObject(body, ['title', 'description', 'status', 'due_date']);
  const parsed = {};
  for (const field of ['title', 'description', 'status']) {
    if (complete || Object.hasOwn(body, field)) {
      parsed[field] = requiredString(body, field);
    }
  }
  if (complete || Object.hasOwn(body, 'due_date')) {
    parsed.due_date = parseDueDate(body.due_date);
  }
  if (Object.keys(parsed).length === 0) {
    throw new AppError(400, 'At least one task field must be provided');
  }
  return parsed;
}

module.exports = {
  validateBody,
  parseRegistration,
  parseLogin,
  parseTaskCreate,
  parseTaskUpdate
};
