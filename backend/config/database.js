module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST"),
      port: 5432,
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
      ssl: { rejectUnauthorized: false },
      pool: {
        min: 0,
        max: 40,
        idleTimeoutMillis: 60000,
        createTimeoutMillis: 60000,
        acquireTimeoutMillis: 60000,
        propagateCreateError: false,
      },
    },
  },
});
