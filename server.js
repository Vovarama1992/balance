import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import db from './models/index.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});