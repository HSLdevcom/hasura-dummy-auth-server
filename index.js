const assert = require("assert");
const express = require("express");

const fail = name => {
  assert.fail(`The environment variable ${name} must be provided`);
};

const getConfig = () => ({
  hasuraRole: process.env.HASURA_ROLE || fail("HASURA_ROLE"),
  port: process.env.PORT || fail("PORT"),
  webhookPath: process.env.WEBHOOK_PATH || fail("WEBHOOK_PATH")
});

const main = () => {
  const config = getConfig();
  const app = express();
  app.get(config.webhookPath, (req, res) => {
    res.json({ "X-Hasura-Role": config.hasuraRole });
  });
  app.listen(config.port);
};

if (require.main === module) {
  main();
}
