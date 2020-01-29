import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import MyForm, { MyAlert } from '../my-form';
import { hylabsJobsformDataRadio } from './hylabs-jobs-form-data-radio';
import { hylabsJobsformData, hylabsJobsTextarea } from './hylabs-jobs-form-data';
import { addHylabsJobReq } from '../../utils/api';
const HylabsJobs = () => {

    const [formMsg, setFormMsg] = useState({
        type: '',
        msg: ''
    });
    const [key, setKey] = useState(1);

    const handleSubmit = async (values, resetForm) => {
        console.log("values", values)
        try {
            const response = await addHylabsJobReq(values);
            //validation error
            if (response.error) {
                setFormMsg({
                    type: 'danger',
                    msg: response.error
                });
            } else {
                console.log('response', response, "resetForm", resetForm);
                setFormMsg({
                    type: 'success',
                    msg: 'Your request has been sent successfully'
                });
                resetForm({})
                //I call setKey to re-render the form to inital the values after clear it by  resetForm({})
                setKey((prevState) => prevState + 1)
            }
        } catch (e) {
            // console.log("e", e)
            setFormMsg({
                type: 'danger',
                msg: e.message
            });
        }
    }
    return (
        <div key={key} >
            <MyForm
                formData={hylabsJobsformDataRadio.concat(hylabsJobsformData, hylabsJobsTextarea)}
                submitText='SEND'
                formMsg={formMsg}
                handleCurrentSubmit={handleSubmit}
                renderFormControls={(errors, touched, handleChange, handleBlur, values, initialValues) => {
                    const formDetails = hylabsJobsformData.map((item, index) => (
                        <Form.Group key={index} >
                            <Form.Label>{item.label}</Form.Label>
                            <Form.Control
                                type={item.type}
                                name={item.name}
                                placeholder={item.placeholder}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            // value={values[item.name] || ''}
                            />
                            {errors[item.name] && touched[item.name] && (
                                <MyAlert variant="danger">{errors[item.name]}</MyAlert>
                            )}
                        </Form.Group>
                    ))
                    formDetails.push(hylabsJobsformDataRadio.map((radio, index) =>
                        (
                            <Form.Group key={index} >
                                <Form.Label>
                                    {radio.title}
                                </Form.Label>
                                <br />
                                {radio.inputs.map((input, idx) =>
                                    <Form.Check
                                        key={`check${idx}`}
                                        inline
                                        type={input.type}
                                        value={input.value}
                                        label={input.label}
                                        name={input.name}
                                        onChange={handleChange}
                                    />
                                )}
                                {errors[radio.name] && touched[radio.name] && (
                                    <MyAlert variant="danger">{errors[radio.name]}</MyAlert>
                                )}
                            </Form.Group>
                        )))
                    formDetails.push(hylabsJobsTextarea.map((item, index) =>
                        < Form.Group key={`textarea${index}`} >
                            <Form.Label>{item.label}</Form.Label>
                            <Form.Control as={item.type} rows={item.rows}
                                onChange={handleChange}
                                name={item.name}
                            />
                        </Form.Group>)
                    )
                    return formDetails;
                }}
            />
            <h4 align='center'>Feel free to send CV to the following email: <span style={{ color: 'blue', textDecorationLine: 'underline' }}>jobs@hylabs.co.il</span></h4>
        </div>
    )
}

export default HylabsJobs;