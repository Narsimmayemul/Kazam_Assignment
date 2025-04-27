import redisClient from '../config/redisClient';
import dotenv from 'dotenv';

dotenv.config();

const KEY = process.env.TASK_KEY!;

export const getTasksFromRedis = async (): Promise<string[]> => {
  const data = await redisClient.get(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasksToRedis = async (tasks: string[]): Promise<void> => {
  await redisClient.set(KEY, JSON.stringify(tasks));
};

export const clearRedis = async (): Promise<void> => {
  await redisClient.del(KEY);
};
