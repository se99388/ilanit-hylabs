import * as yup from 'yup';


export const schemaYup = (firtsName, lastName, email, phone, institute, lab) => {

    return yup.object().shape({
        [firtsName]: yup.string().required('Write your first name'),
        [lastName]: yup.string().required('Write your last name'),
        [email]: yup.string().required('Write your email').email('wrong email'),
        [phone]: yup.string(),
        [institute]: yup.string().required('Write your institute'),
        [lab]: yup.string().required('Write your lab')
    });
}


export const isValidate = (currentObj) => {
    let schema = schemaYup(...Object.keys(currentObj))
    return schema.strict().validate(currentObj)
        .then(data => data)
        .catch(errors => { throw errors })
}

export default schemaYup;