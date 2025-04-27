import { Router } from 'express';
import controller from '../controllers/taskController';


const router = Router();

router.get('/fetchAllTasks', controller.fetchAllTasks);

router.post('/add', controller.addTask );

export default router;
