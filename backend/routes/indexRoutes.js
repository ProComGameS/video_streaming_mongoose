import express from 'express';
const router = express.Router();

import videoRoutes from "./videoRoutes.js";
import authRoutes from "./authRoutes.js";



router.use(videoRoutes);
router.use(authRoutes);


export default router;

