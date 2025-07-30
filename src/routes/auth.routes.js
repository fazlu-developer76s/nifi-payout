import router from 'express';
import { sendOtp , signInFunction } from '../controllers/auth.controller.js';
import validationCheck from '../middlewares/validation.middleware.js';
import { sendLoginOtp , signInValidation } from '../utils/validation.js';
const authRouter = router.Router();
authRouter.post('/signin', validationCheck(signInValidation) , signInFunction);
authRouter.post('/send-otp', validationCheck(sendLoginOtp) , sendOtp);

export default authRouter;