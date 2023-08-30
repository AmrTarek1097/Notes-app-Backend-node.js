import { Router } from "express";
import * as userController from './user.controller.js'
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn, userController.forgotPass);
router.put('/changePassword',auth, userController.changePassword);
router.put('/updateUser',auth, userController.updateUser);
router.delete('/deleteUser',auth, userController.deleteUser);
router.put('/softDelete',auth, userController.softDelete);
router.get('/logOut',auth, userController.logOut);
router.get('/verified/:email', userController.verified);
router.post('/forgotPass', userController.forgotPass);
router.put('/checkCode', userController.checkCode);

export default router;