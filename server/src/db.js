const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '85.209.46.216',
  user: 'vernik03',
  password: 'spf2023_admin',
  database: 'hr_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const User = {
  getUserByTelegram: async (telegram) => {
    const [rows] = await pool.execute('SELECT * FROM members WHERE Telegram = ?', [telegram]);
    return rows[0];
  },

  getListOfAllUsers: async () => {
    const [rows] = await pool.execute('SELECT * FROM members');
    return rows;
  },

  getTelegramFromMemberID: async (memberID) => {
    const [rows] = await pool.execute('SELECT Telegram FROM members WHERE MemberID = ?', [memberID]);
    return rows[0];
  }
};

module.exports = User;
