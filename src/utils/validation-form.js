import * as yup from 'yup';
import formData from './form-data';

export const schemaYup = () => {
    const yupScheme = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.yup;
        return acc;
    }, {});

    return yup.object().shape(yupScheme);
};

export const isValidate = currentObj => {
    let schema = schemaYup();
    return schema.strict().validate(currentObj);
};

export default schemaYup;
