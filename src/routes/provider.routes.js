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

providerRouter.post('/', verifyToken, validationCheck(providerValidation), createProvider);
providerRouter.get('/', verifyToken, getProviders);
providerRouter.put('/:id', verifyToken, validationCheck(providerValidation), updateProvider);
providerRouter.delete('/:id', verifyToken, deleteProvider);

export default providerRouter;
