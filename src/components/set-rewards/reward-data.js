import * as yup from 'yup';

export const rewardData = [
    // {
    //     type: 'text',
    //     label: 'Id:',
    //     placeholder: 'Enter your ID',
    //     name: 'id',
    //     yup: yup.string().required('Write your id')
    // },
    {
        type: 'text',
        label: 'Reward:',
        placeholder: 'Enter reward',
        name: 'reward',
        value: '',
        yup: yup.string().required('Write your reward')
    },
    {
        type: 'number',
        label: 'Quantity',
        placeholder: 'Enter quantity',
        name: 'quantity',
        value: '',
        yup: yup
            .number('Has to be a number')
            .min(1,'Has to be more than 0')
            .required('Write your quantity')
    },
    {
        type: 'text',
        label: 'Image:',
        placeholder: 'Enter image source',
        name: 'image',
        value: ''
    }
];
