import joi from 'joi';

const sendLoginOtp = joi.object({
    login_key: joi.string().required().messages({
      'string.empty': 'Please provide a valid email or mobile number',
    }),
});

const signInValidation = joi.object({
  login_key: joi.string().required().messages({
    'string.empty': 'Please provide a valid email or mobile number',
    'any.required': 'Login key is required',
  }),
  otp: joi.string().length(6).required().messages({
    'string.length': 'OTP must be exactly 6 digits',
    'string.empty': 'OTP is required',
    'any.required': 'OTP is required',
  }),
  role: joi.string().required().messages({
    'string.empty': 'Role is required',
  })
});

const categoryValidation = joi.object({
    category_name: joi.string().required().messages({
        'string.empty': 'Category is required'
    }),
    status: joi.string().required().messages({
        'string.empty': 'Category status is required'
    })
});

const providerValidation = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'Provider name is required',
  }),
  baseUrl: joi.string().allow('', null),
  userName: joi.string().allow('', null),
  password: joi.string().allow('', null),
  option1: joi.string().allow('', null),
  option2: joi.string().allow('', null),
  option3: joi.string().allow('', null),
  option4: joi.string().allow('', null),
  code: joi.string().allow('', null),
  provider_status: joi.string().required().messages({
    'string.empty': 'Provider status is required',
  }),
});

export{
    sendLoginOtp,
    signInValidation,
    categoryValidation,
    providerValidation
}