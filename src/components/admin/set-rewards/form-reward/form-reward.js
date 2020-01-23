import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import MyForm, { MyAlert } from '../../../my-form';
const FormReward = ({ formData,
    rewardsImages,
    handleCurrentSubmit,
    submitText,
    rewardImageSelected,
    error }) => {

    return (
        <>
            <MyForm
                formData={formData}
                handleCurrentSubmit={handleCurrentSubmit}
                submitText={submitText}
                error={error}
                renderFormControls={(errors, touched, handleChange, handleBlur, initialValues) => {
                    const allFormData =
                        formData.map((item, index) => (
                                <Form.Group as={Col} key={index} sm={4} >
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
                        ))

                    if (rewardsImages.length) {
                        allFormData.push(
                            <Form.Group as={Col} sm="4" key='rewardsImages'>
                                <Form.Control as="select"
                                    name="image"
                                    // defaultValue={rewardImageSelected || ''}
                                    defaultValue={ ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option disabled value='' >Choose image...</option>
                                    {rewardsImages.map((item, index) => <option
                                        key={index}
                                        value={item}

                                    >{item}</option>)}
                                </Form.Control>
                            </Form.Group>)
                    }
                    return (<div style={{ display: 'flex', flexWrap: 'wrap'}}>
                        {allFormData}
                        </div>);
                }}
            />
        </>
    )
}

export default FormReward;