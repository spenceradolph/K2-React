import mysql, { PoolOptions } from 'mysql2/promise';

const host = process.env.DB_HOSTNAME || 'localhost'; // TODO: .env file
const user = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'islandrushdb';

const databaseConfig: PoolOptions = {
    host,
    user,
    password,
    database,
    connectionLimit: 25,
    multipleStatements: true // it allows for SQL injection attacks if values are not properly escaped
};

export const pool = mysql.createPool(databaseConfig);
