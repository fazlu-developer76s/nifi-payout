import router from 'express';
import { sendOtp , signInFunction } from '../controllers/auth.controller.js';
import validationCheck from '../middlewares/validation.middleware.js';
import { sendLoginOtp , signInValidation } from '../utils/validation.js';
const authRouter = router.Router();
authRouter.post('/admin/verify-otp', validationCheck(signInValidation) , signInFunction);
authRouter.post('/admin/send-otp', validationCheck(sendLoginOtp) , sendOtp);
authRouter.post('/user/verify-otp', validationCheck(signInValidation) , signInFunction);
authRouter.post('/user/send-otp', validationCheck(sendLoginOtp) , sendOtp);

export default authRouter;