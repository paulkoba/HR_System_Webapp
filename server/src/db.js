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
  },

  getListOfAllTasks: async () => {
    const [rows] = await pool.execute('SELECT * FROM tasks');
    return rows;
  },

  getTaskByTaskId: async (taskId) => {
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE TaskID = ?', [taskId]);
    return rows[0];
  },

  getTelegramFromTelegramID: async (id) => {
    const [rows] = await pool.execute('SELECT Username FROM users_id WHERE UserID = ?', [id]);
    return rows[0];
  },

  getAssignees: async (id) => {
    const [rows] = await pool.execute('SELECT ID FROM users_tasks WHERE TaskID = ?', [id]);
    return rows;
  },

  getUsersWithAssignedTasks: async () => {
    const [rows] = await pool.execute(`
      SELECT DISTINCT u.UserID, u.Username
      FROM users_tasks ut
      JOIN users_id u ON ut.ID = u.UserID
    `);
    return rows;
  },

  getTasksAssignedToUser: async (id) => {
    const [rows] = await pool.execute('SELECT DISTINCT tasks.* FROM tasks JOIN users_tasks ON tasks.TaskID = users_tasks.TaskID WHERE users_tasks.ID = ?', [id]);
    return rows;
  }
};

module.exports = User;
