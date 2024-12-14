import pkg from 'pg'; // Import ทั้งหมดจาก CommonJS module
const { Pool } = pkg; // ดึง Pool จาก pkg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SchoolDB',
  password: '15905497',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    return;
  }
  console.log("Connected to database");
  release();
});

export default pool; // Export instance ของ pool
