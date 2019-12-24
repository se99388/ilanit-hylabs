// export const loginData = [
//     {
//         type: 'text',
//         label: 'Password:',
//         placeholder: 'Enter password',
//         name: 'password',
//         yup: yup
//             .string()
//             .required('Write your password')
//             .min(3, 'Should be 3 characters at least')
//     },
//     {
//         type: 'text',
//         label: 'Email:',
//         placeholder: 'Enter email',
//         name: 'email',
//         yup: yup
//             .string()
//             .required('Write your email')
//             .email('wrong email')
//     }
// ];
export const getInitialFormValues = data =>
    data.reduce((acc, curr) => {
        acc[curr.name] = curr.value || '';
        return acc;
    }, {});
