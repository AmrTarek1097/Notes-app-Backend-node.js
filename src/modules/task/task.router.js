import { Router } from "express";
import * as taskController from "./task.controller.js"
import { auth } from "../../middleware/auth.js";


const router = Router();

router.post('/addTask', auth,taskController.addTask);
router.get('/getAllTasks', taskController.getAllTasks);
router.get('/getAllCreatedTasks', auth, taskController.getAllCreatedTasks);
router.get('/getAllAssignedTasks', auth, taskController.getAllAssignedTasks);
router.put('/updateTask/:taskId', auth, taskController.updateTask);
router.delete('/deleteTask/:taskId', auth, taskController.deleteTask);
router.get('/tasksAfterDeadline', auth, taskController.tasksAfterDeadline);


export default router;