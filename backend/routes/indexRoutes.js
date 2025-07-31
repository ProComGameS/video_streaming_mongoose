import express from 'express';
const router = express.Router();

import videoRoutes from "./videoRoutes.js";
import authRoutes from "./authRoutes.js";
import miscRoutes from "./miscRoutes.js";


router.use(videoRoutes);
router.use(authRoutes);
router.use(miscRoutes);

export default router;

