module.exports = {
  ParseDbStr: function (dbStr) {
    // Extracting username and password
    const [username, password] = dbStr.match(/^(.*?):(.*?)@/).slice(1);

    // Extracting protocol, host, and port
    const [, protocol, host, port] = dbStr.match(/@([^:]+):\d+/).slice(1);

    // Extracting database name
    const [, database] = dbStr.match(/\/(.*)$/).slice(1);

    return { username, password, protocol, host, port, database };
  },
};
