import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/config.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
});

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, 'migrations', '*.js'),
    resolve: ({ name, path, context }) => {
      return {
        name,
        up: async () => (await import(path)).default.up(context, Sequelize),
        down: async () => (await import(path)).default.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    console.log('Executing migrations...');
    await umzug.up();
    console.log('Migrations have been executed successfully.');
  } catch (error) {
    console.error('Error executing migrations:', error);
  } finally {
    await sequelize.close();
  }
})();