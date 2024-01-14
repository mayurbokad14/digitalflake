import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// Replace these values with your MySQL database credentials
const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
