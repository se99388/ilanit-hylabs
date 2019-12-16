import * as yup from 'yup';
import { getInterests } from '../utils/api';

let allInt = []
export const allData = async () => {
   
    try {
        const interests =  await getInterests();
        allInt = interests.map((item) => {
            return (
                {
                    type: 'checkbox',
                    label: item.name,
                    name: item.name,
                    id: item.id,
                }
            )
        })
        let interestsObj = { interests:[...allInt]}
        // console.log([...formData,{ ...interestsObj}])
        return [...formData, { ...interestsObj }];

    }
    catch (e){
        throw e
    }
}




const formData = [
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

export default formData;

export const loginData = [
    {
        type: 'text',
        label: 'Password:',
        placeholder: 'Enter password',
        name: 'password',
        yup: yup.string().required('Write your password').min(3, 'Should be 3 characters at least')
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
    }
];
export const getInitialFormValues = (data) =>
    data.reduce((acc, curr) => {
        acc[curr.name] = '';
        return acc;
    }, {});
