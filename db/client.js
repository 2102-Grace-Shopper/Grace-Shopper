const { Client } = require('pg');
const DB_NAME = 'Doge';
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5000/${ DB_NAME }`;
const client = new Client(DB_URL)
const db = require('./db');

module.exports = {
    client
}