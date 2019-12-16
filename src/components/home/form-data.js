import * as yup from 'yup';

export const formData = [
    {
        type: 'text',
        label: 'First name:',
        placeholder: 'Enter first name',
        name: 'firstName',
        yup: yup.string().required('Write your first name')
    },
    {
        type: 'text',
        label: 'Last name:',
        placeholder: 'Enter last name',
        name: 'lastName',
        yup: yup.string().required('Write your last name')
    },
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
        type: 'text',
        label: 'Phone:',
        placeholder: 'Enter phone No.',
        name: 'phone',
        yup: yup.string()
    },
    {
        type: 'text',
        label: 'Institute/Company',
        placeholder: 'Enter Institute/Company',
        name: 'institute',
        yup: yup.string().required('Write your institute')
    },
    {
        type: 'text',
        label: 'Lab',
        placeholder: 'Enter lab',
        name: 'lab',
        yup: yup.string().required('Write your lab')
    }
];
