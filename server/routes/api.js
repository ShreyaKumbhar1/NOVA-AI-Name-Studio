import express from 'express';
import {
  handleGenerate,
  handleRemix,
  handleAnalyze,
  handleSurprise,
  handleCopilot,
  handleGetSampleSessions,
  handleHealth
} from '../controllers/namingController.js';

const router = express.Router();

router.post('/generate', handleGenerate);
router.post('/remix', handleRemix);
router.post('/analyze', handleAnalyze);
router.post('/surprise', handleSurprise);
router.post('/copilot', handleCopilot);
router.get('/sample-sessions', handleGetSampleSessions);
router.get('/health', handleHealth);

export default router;
