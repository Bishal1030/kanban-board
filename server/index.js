require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use(express.json());

const port = process.env.PORT || 6030;

app.use('/api', require('./routes'))

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();


app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
