require('dotenv').config();

function loadConfig(env = process.env) {
  const missing = ['DATABASE_URL', 'JWT_SECRET', 'PORT'].filter(
    (key) => typeof env[key] !== 'string' || env[key].trim() === ''
  );

  if (missing.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missing.join(', ')}`);
  }

  const port = Number(env.PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return {
    databaseUrl: env.DATABASE_URL,
    jwtSecret: env.JWT_SECRET,
    port
  };
}

module.exports = { loadConfig };
