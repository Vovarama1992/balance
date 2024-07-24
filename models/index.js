import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import UserModel from './user.js';

const env = 'development';
const sequelizeConfig = config[env];
const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
  host: sequelizeConfig.host,
  dialect: sequelizeConfig.dialect,
});

const User = UserModel(sequelize, Sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
};

export default db;