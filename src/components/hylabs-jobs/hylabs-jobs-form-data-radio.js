import * as yup from 'yup';

export const hylabsJobsformDataRadio = [

    {
        title: 'Student Job',
        inputs: [
            {
                type: 'radio',
                value: false,
                name: 'studentJob',
                label: 'No'
            },
            {
                type: 'radio',
                value: true,
                name: 'studentJob',
                label: 'Yes'
            }
        ],
        name: 'studentJob',
        yup: yup.string().required("A radio option is required"),

    },
    {
        title: 'Full-Time Job',
        inputs: [
            {
                type: 'radio',
                value: false,
                name: 'fullTimeJob',
                label: 'No',
            },
            {
                type: 'radio',
                value: true,
                name: 'fullTimeJob',
                label: 'Yes'
            }
        ],
        name: 'fullTimeJob',
        yup: yup.string().required("A radio option is required"),
    }



];
