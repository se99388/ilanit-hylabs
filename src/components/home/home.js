import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { getInterests, addUser } from '../../utils/api';
import useHTMLTitle from '../../hooks/use-html-title';
import { formData, hylabsJobInterested } from './form-data';
import MyForm, { MyAlert } from '../my-form';
import { InterestCol, color, fontWeight } from './home.styled'


const COLOR = ['#F5CDDE',
    ' #C6F8E5',
    '#E4DECB',
    '#E2BEF1',
    '#F9DED7',
    '#CCE1F2',
    '#FBF7D5',
    '#F5CDDE']
const Home = (props) => {



    useHTMLTitle('HyLabs - Home');
    const [interests, setInterests] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [formMsg, setformMsg] = useState({ type: '', msg: '' });

    useEffect(() => {
        (async () => {
            try {
                const interests = await getInterests();
                //get array of groups (might duplicates)
                const map = interests.map(interest => interest.group);
                //get array of unique group (no duplicates)
                const interestsGroup = [...new Set(map)];
                //get array of all interests under each group. all interest will convert to obj that contain the releavent keys for checkbox tag
                const allInt = interestsGroup.map(item => interests.filter(obj => obj.group == item).map(item => ({
                    type: 'checkbox',
                    label: item.name,
                    name: "interests",
                    id: item.id
                }))
                );
                setInterests(allInt);
            } catch (e) {
                setformMsg({ type: 'danger', msg: e.message });
            }

        })();
    }, []);

    const handleMySubmit = async values => {
        try {
            const response = await addUser(values);
            console.log('response', response);
            //validation error
            if (response.error) {
                setformMsg({ type: 'danger', msg: response.error });
            } else {
                setformMsg({});
                props.history.push({
                    pathname: '/thankyou',
                    state: { detail: response }
                });
            }
        } catch (e) {
            // console.log("e", e)
            setformMsg({ type: 'danger', msg: e.message });
        }
    };
    const handleChecked = (e) => {
        const idItem = parseInt(e.target.id);
        const isChecked = e.target.checked;
        setCheckedItems(new Map(checkedItems.set(idItem, isChecked)))
    }

    return (
        <MyForm
            formData={[...formData, ...hylabsJobInterested]}
            handleCurrentSubmit={handleMySubmit}
            submitText="Submit"
            formMsg={formMsg}
            renderFormControls={(errors, touched, handleChange, handleBlur) => {
                const allFormData = formData.map((item, key) => (
                    <Form.Group key={key}>
                        <Form.Label>{item.label}</Form.Label>

                        <Form.Control
                            type={item.type}
                            name={item.name}
                            placeholder={item.placeholder}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors[item.name] && touched[item.name] && (
                            <MyAlert variant="danger">{errors[item.name]}</MyAlert>
                        )}
                    </Form.Group>
                ));

                if (interests.length) {
                    allFormData.push(
                        <Form.Group key={allFormData.length}>
                            <Form.Label >Field of interests:</Form.Label>
                            <Form.Row className='mb-3'>
                                {interests.map((group, groupIndex) => (
                                    <Form.Group key={groupIndex}>
                                        {group.map((interest) => (
                                            <InterestCol key={interest.id} xs='auto'
                                                backgroundcolor={COLOR[groupIndex]}

                                                fontWeight={checkedItems.get(interest.id) == true ? fontWeight : null}
                                            >
                                                <Form.Check
                                                    inline
                                                    type={interest.type}
                                                    id={interest.id}
                                                    label={interest.label}
                                                    name="interests"
                                                    onChange={handleChange}
                                                    value={interest.id}
                                                    onClick={handleChecked}
                                                />
                                            </InterestCol>
                                        ))}
                                    </Form.Group>
                                ))}
                            </Form.Row>
                        </Form.Group>
                    );
                }

                allFormData.push(
                    <Form.Group key={allFormData.length}>
                        {hylabsJobInterested.map((item, index) => (
                            <Form.Check
                                key={index}
                                type={item.type}
                                label={item.label}
                                name={item.name}
                                onChange={handleChange}
                                value={item.id}
                            />
                        ))}
                    </Form.Group>
                );
                return allFormData;
            }}
        />
    );
};

export default withRouter(Home);
