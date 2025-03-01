// lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST, // e.g., "localhost"
  user: process.env.DB_USER, // your DB username
  password: process.env.DB_PASSWORD, // your DB password
  database: process.env.DB_NAME, // your DB name
  waitForConnections: true,
  connectionLimit: 10, // adjust based on your requirements
  queueLimit: 0,
});

export default pool;
