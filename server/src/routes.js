const db = require('./db')

validateAuth = async (authToken) => {
  if (authToken !== undefined && authToken !== 'undefined') {
    var result = await db.validateAuthToken(authToken);
    console.log("Token is owned by user: ", result)
    if (Array.isArray(result) && result.length > 0 && 'Username' in result[0]) {
      return result;
    }
  }
  return null;
}

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

  router.get('/tasks/', async (req, res) => {
    try {
      const tasks = await db.getListOfAllTasks();
      console.log("Received tasks:", tasks)
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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

  router.get('/tasks/:task_id', async (req, res) => {
    try {
      const task = await db.getTaskByTaskId(req.params.task_id);
      console.log("Received task:", task)
      res.json(task);
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

  router.get('/username_from_id/:id', async (req, res) => {
    try {
      const telegram = await db.getTelegramFromTelegramID(req.params.id);
      console.log("Received users:", telegram)
      res.json(telegram);
    } catch (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/verify_creds/:id', async (req, res) => {
    try {
      const telegram = await db.getUsernameFromAuthToken(req.params.id);
      console.log("Received users:", telegram)
      res.json(telegram);
    } catch (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/assignees/:task_id', async (req, res) => {
    try {
      const telegram = await db.getAssignees(req.params.task_id);
      console.log("Received users:", telegram)
      res.json(telegram);
    } catch (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/assignees/', async (req, res) => {
    try {
      const telegram = await db.getUsersWithAssignedTasks();
      console.log("Received users:", telegram)
      res.json(telegram);
    } catch (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/tasks_assigned_to/:user_id', async (req, res) => {
    try {
      const tasks = await db.getTasksAssignedToUser(req.params.user_id);
      console.log("Received tasks:", tasks)
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/edit_user/:user', async (req, res) => {
    try {
      if (validateAuth(req.headers.authorization) == null) {
        console.log("Couldn't verify auth token")
        res.status(403).json({ error: 'Forbidden' });
        return
      }

      const newUser = req.body;
      const result = db.updateUser(req.params.user, newUser);
      console.log("Received user:", newUser)
      res.json({ result: result ? "ok" : "failed"});
    } catch (error) {
      console.error('Error editing user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/edit_task/:task_id', async (req, res) => {
    try {
      if (validateAuth(req.headers.authorization) == null) {
        console.log("Couldn't verify auth token")
        res.status(403).json({ error: 'Forbidden' });
        return
      }

      const newTask = req.body;
      const result = db.updateTask(req.params.task_id, newTask);
      console.log("Received task:", newTask)
      res.json({ result: result ? "ok" : "failed"});
    } catch (error) {
      console.error('Error editing user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
}
