module.exports = {
  port: process.env.PORT || 5000,
  environment: process.env.ENVIRONMENT || "development",
  secret: process.env.SECRET || "I am the default secret",
  tokenExpiration: "10000000",
  db_url:
    process.env.DB_URL ||
    "postgres://cztvsobg:vnUrFwmxQzG0V5CttR8XpjH89N1Mqtcs@lallah.db.elephantsql.com:5432/cztvsobg",
};
