import { Request, Response } from 'express';
import Task from '../models/Task';
import { getTasksFromRedis, saveTasksToRedis, clearRedis } from '../services/redisService';
import { moveTasksToMongo } from '../services/mongoService';

const addTask = async (req: any, res: any) => {
  try {
    const task = req.body.task;
    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }

    let tasks = await getTasksFromRedis();
    tasks.push(task);

    if (tasks.length > 50) {
      await moveTasksToMongo(tasks);
      await clearRedis();
      console.log('Moved 50+ tasks to MongoDB and cleared Redis');
    } else {
      await saveTasksToRedis(tasks);
      console.log('Task saved to Redis');
    }

    res.status(200).json({ message: 'Task processed successfully' });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const fetchAllTasks = async (req: Request, res: Response) => {
  try {
    const redisTasks = await getTasksFromRedis();
    const mongoTasks = await Task.find({});

    const combined = [
      ...redisTasks.map((item: any) => ({ item })),
      ...mongoTasks,
    ];

    res.json(combined);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};


export default {addTask , fetchAllTasks}