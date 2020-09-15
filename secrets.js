module.exports = {
  port: process.env.PORT || 5000,
  environment: process.env.ENVIRONMENT || "development",
  secret: process.env.SECRET || "I am the default secret",
  tokenExpiration: '10000000'
};
