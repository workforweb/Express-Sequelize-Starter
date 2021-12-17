const { Sequelize } = require('sequelize');
const mariadb = require('mariadb');

const host = process.env.DB_HOST;
const port = process.env.PORT;
const dialect = process.env.DB_DIALECT;
const database = process.env.DB_DBNAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const pool = mariadb.createPool({ host, port, user, password });

pool.query(`CREATE DATABASE IF NOT EXISTS ${database};`);

const sequelize = new Sequelize(database, user, password, { host, dialect });

module.exports = sequelize;
