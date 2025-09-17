import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 charactres')
    .required('Name is Required'),

  userName: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, 'Your Username must be alphabetical characters')
    .min(8, 'User Name must be at least 8 characters')
    .required('User Name is Required'),

  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 charaters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  corporate: yup.string()
});
