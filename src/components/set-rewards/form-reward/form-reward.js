import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import MyForm, { MyAlert } from '../../my-form';

const FormReward = ({ formData,
    handleCurrentSubmit,
    submitText,
    error }) => {
    console.log("formData", formData)
    return (
        <>
            <MyForm
                formData={formData}
                handleCurrentSubmit={handleCurrentSubmit}
                submitText={submitText}
                error={error}
                renderFormControls={(errors, touched, handleChange, handleBlur,initialValues) => {
                    const allFormData =
                        <Form.Row>
                            {formData.map((item, index) => (
                                <Form.Group as={Col} sm="4" key={index} >
                                    <Form.Label>{item.label}</Form.Label>

                                    <Form.Control
                                        type={item.type}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={initialValues[item.name]}
                                      
                                    />
                                    {errors[item.name] && touched[item.name] && (
                                        <MyAlert variant="danger">{errors[item.name]}</MyAlert>
                                    )}
                                </Form.Group>
                            ))}
                        </Form.Row>
                    return allFormData;
                }}
            />
        </>
    )
}

export default FormReward;