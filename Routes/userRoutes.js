import { getAllusers, getOneuser, updateuser, deleteuser } from "../controllers/userController.js";
import express from 'express';

//import multer helper
import upload from '../multerconfig.js';


const router = express.Router();

router.get('/', getAllusers);
router.get('/:id', getOneuser);
// accept either 'profilePic' or 'profilepic' from clients; use fields to avoid Unexpected field errors
router.put('/:id', upload.fields([
	{ name: 'profilePic', maxCount: 1 },
	{ name: 'profilepic', maxCount: 1 }
]), updateuser);
router.delete('/:id', deleteuser);

export default router;