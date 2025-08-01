import express from 'express';
import { analyzeWebsite, downloadCsvReport } from '../controllers/analysisController.js';

const router = express.Router();
router.post('/', analyzeWebsite);
router.get('/download/:id', downloadCsvReport);

export default router;





