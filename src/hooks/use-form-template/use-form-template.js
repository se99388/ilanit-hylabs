import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import schemaYup, { isValuesExist } from '../../utils/validation-form';
import { getInitialFormValues } from '../../utils/form-data';
import { Formik } from 'formik';
import { MyForm, MyAlert } from './use-form-template.style'

const UseFormTemplate = (formData, handleCurrentSubmit) => {
    const [error, setError] = useState(null);

    return (
        [<Formik
            initialValues={getInitialFormValues(formData)}
            validationSchema={schemaYup(formData)}
            onSubmit={handleCurrentSubmit}
        >{({ errors, touched, handleChange, handleBlur, values, handleSubmit }) => {
            return (

                <MyForm onSubmit={handleSubmit}>
                {console.log(values)}
                    {formData.map((item, key) => {
                        return (
                            item.interests ?
                                <div key={key}>
                                    <Form.Label >Interested in:</Form.Label>
                                    {item.interests.map((interest, interestKey) => {
                                        return (
                                            <div key={interestKey} className="mb-3">
                                                <Form.Check
                                                    type={interest.type}
                                                    id={interest.id}
                                                    label={interest.label}
                                                    name={Object.keys(item)[0]}
                                                    onChange={handleChange}
                                                    value={interest.id}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <Form.Group key={key}>
                                    <Form.Label>{item.label}</Form.Label>

                                    <Form.Control
                                        type={item.type}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {errors[item.name] && touched[item.name] && (
                                        <MyAlert variant="danger">{errors[item.name]}</MyAlert>)}
                                </Form.Group>
                        )
                    })}
                    {error && <MyAlert variant="danger">{error}</MyAlert>}
                    < Button
                        variant="primary"
                        type="submit"
                    // disabled={!isValuesExist(values) || Object.keys(errors).length}
                    >
                        Submit
                        </Button>
                    <br />
                </MyForm>
            )
        }}

        </Formik>,
            setError
        ]
    )
}

export default UseFormTemplate;