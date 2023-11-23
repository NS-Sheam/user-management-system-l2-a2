import express, { Router } from 'express';
// import { UserController } from "./user.controller";

const router: Router = express.Router();

router.get('/');
router.post('/');
router.get('/:userId');
router.put('/:userId');
router.delete('/:userId');

export const UserRoutes = router;
