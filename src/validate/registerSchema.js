import * as yup from "yup"

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('The name field is required.'),
  email: yup
    .string()
    .required('The email field is required.')
    .email('Email is invalid'),
  password: yup 
    .string()
    .required('The password field is required.')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  pwconfirm: yup
    .string()
    .required('The password confirmation field is required.')
    .oneOf([yup.ref('password'), null], 'Passwords dont match'),
  terms: yup.boolean().oneOf([true], 'Accept Terms is required.')
})