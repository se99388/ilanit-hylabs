import * as yup from 'yup';

export const authData = [
    {
        type: 'text',
        label: 'Email:',
        placeholder: 'Enter email',
        name: 'email',
        yup: yup
            .string()
            .required('Write your email')
            .email('wrong email')
    },
    {
        type: 'password',
        label: 'Password:',
        placeholder: 'Enter your password',
        name: 'password',
        yup: yup
            .string()
            .required('Write your password')
            .min(3, "You should write 3 characters at least")
    }
];
