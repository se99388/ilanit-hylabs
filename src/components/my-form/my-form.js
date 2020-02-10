import React from 'react';
import { Button } from 'react-bootstrap';
import schemaYup, { isValuesExist } from '../../utils/validation-form';
import { Formik } from 'formik';
import { getInitialFormValues } from '../../utils/form-data';
import { ContainerForm, MyAlert, MyButton } from './my-form.style';

const MyForm = ({ formData, handleCurrentSubmit, submitText, renderFormControls, formMsg = {}, error }) => {

    console.log("getInitialFormValues(formData)", getInitialFormValues(formData))
    return (
        <Formik
            enableReinitialize
            initialValues={getInitialFormValues(formData)}
            validationSchema={schemaYup(formData)}
            onSubmit={(values, { resetForm }) => handleCurrentSubmit(values, resetForm)}
        >
            {({ errors, touched, handleChange, handleBlur, values, handleSubmit, initialValues, resetForm }) => {
                return (
                    <ContainerForm onSubmit={handleSubmit}>
                        {renderFormControls(errors, touched, handleChange, handleBlur, values, initialValues, resetForm)}
                        {error && <MyAlert variant="danger">{error}</MyAlert>}
                        {formMsg.msg && <MyAlert variant={formMsg.type}>{formMsg.msg}</MyAlert>}
                        <MyButton
                            variant="primary"
                            type="submit"
                            disabled={!isValuesExist(values) || Object.keys(errors).length}
                        >
                            {submitText}
                        </MyButton>
                        <br />
                    </ContainerForm>
                );
            }}
        </Formik>
    );
};

export default MyForm;
