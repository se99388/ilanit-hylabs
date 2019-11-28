import express from 'express';
import api from './api';
import adiel from './adiel';

const router = express.Router();

router.use('/api', api);
router.use('/adi', adiel);

export default router;
