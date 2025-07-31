import express from 'express';
import {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider
} from '../controllers/provider.controller.js';

import verifyToken from '../middlewares/auth.middleware.js';
import validationCheck from '../middlewares/validation.middleware.js';
import { providerValidation } from '../utils/validation.js';

const providerRouter = express.Router();

providerRouter.post('/admin/provider', verifyToken, validationCheck(providerValidation), createProvider);
providerRouter.get('/admin/provider', verifyToken, getProviders);
providerRouter.put('/admin/provider/:id', verifyToken, validationCheck(providerValidation), updateProvider);
providerRouter.delete('/admin/provider/:id', verifyToken, deleteProvider);

export default providerRouter;
