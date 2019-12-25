import React from 'react';
import { Button } from 'react-bootstrap';
import schemaYup, { isValuesExist } from '../../utils/validation-form';
import { Formik } from 'formik';
import { getInitialFormValues } from '../../utils/form-data';
import { ContainerForm, MyAlert } from './my-form.style';

const MyForm = ({ formData, handleCurrentSubmit, submitText, error, renderFormControls }) => {
    console.log("getInitialFormValues(formData)", getInitialFormValues(formData))
    return (
        <Formik
        enableReinitialize
            initialValues={getInitialFormValues(formData)}
            validationSchema={schemaYup(formData)}
            onSubmit={handleCurrentSubmit}
        >
            {({ errors, touched, handleChange, handleBlur, values, handleSubmit, initialValues }) => {
                return (
                    <ContainerForm onSubmit={handleSubmit}>
                        {renderFormControls(errors, touched, handleChange, handleBlur, values, initialValues)}
                        {error && <MyAlert variant="danger">{error}</MyAlert>}
                        <Button
                            variant="primary"
                            type="submit"
                            // disabled={!isValuesExist(values) || Object.keys(errors).length}
                        >
                            {submitText}
                        </Button>
                        <br />
                    </ContainerForm>
                );
            }}
        </Formik>
    );
};

export default MyForm;
