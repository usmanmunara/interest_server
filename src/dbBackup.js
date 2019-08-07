const schedule = require('node-schedule');
const mysqldump = require('mysqldump');

const config = require('./config');

module.exports = schedule.scheduleJob('/15 0 * * *', function updateUserStatus() {
  mysqldump({
    connection: {
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
    },
    dumpToFile: './interest_backup.sql',
  });
});
