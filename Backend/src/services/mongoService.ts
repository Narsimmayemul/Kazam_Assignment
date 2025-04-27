import Task from '../models/Task';

export const moveTasksToMongo = async (tasks: string[]): Promise<void> => {
  await Task.insertMany(tasks.map(item => ({ item })));
};
