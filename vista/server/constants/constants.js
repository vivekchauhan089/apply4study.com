const hostname = process.env.HOST || 'localhost';

const port = Number(process.env.PORT) || 9000;

const DBUrl =
  process.env.DB_CONNECTION_URL || 'mongodb://127.0.0.1:27017/lms';

const secretKey = '12345-67890-09876-54321';

module.exports = {
  hostname,
  port,
  DBUrl,
  secretKey,
};
