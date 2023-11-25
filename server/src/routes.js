const db = require('./db')

module.exports = () => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/hello', async (req, res) => {
    res.json({msg: "Hello, world!"});
  });

  router.get('/hello/:name', async (req, res) => {
    res.json({msg: `Hello, ${req.params.name}`});
  });

  router.get('/users/', async (req, res) => {
    try {
      const users = await db.getListOfAllUsers();
      console.log("Received users:", users)
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/users/:telegram', async (req, res) => {
    try {
      const users = await db.getUserByTelegram('@' + req.params.telegram);
      console.log("Received users:", users)
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/member_id_to_telegram/:member_id', async (req, res) => {
    try {
      const telegram = await db.getTelegramFromMemberID(req.params.member_id);
      console.log("Received users:", telegram)
      res.json(telegram);
    } catch (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
}
