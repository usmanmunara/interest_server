const schedule = require('node-schedule');
const mysqldump = require('mysqldump');

const config = require('./config');

module.exports = schedule.scheduleJob('/30 * * * *', function backupDatabase() {
  console.log('cron');
  mysqldump({
    connection: {
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
    },
    dumpToFile: 'interest_backup.sql',
  });
});
