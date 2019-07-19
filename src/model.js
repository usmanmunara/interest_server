const Sequelize = require('sequelize');
const config = require('./config');

const sequelizeConfig = {
  host: config.mysql.host,
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4_general_ci'
  },
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'production' ? false : console.log
};

const sequelize = new Sequelize(sequelizeConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

require('./User/userModel')(sequelize, config.modelNames.userModel);

sequelize
  .sync({
    // force: true // DANGER: USE WITH CARE. This option will remove existing tables
  })
  .then(() => {
    console.log('Synced');
  });

module.exports = sequelize;
