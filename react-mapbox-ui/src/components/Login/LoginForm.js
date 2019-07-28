import React, { Component, Fragment} from 'react';

import {Form, FormField, Input, Icon} from 'semantic-ui-react';
import {connect} from "react-redux";
import {login} from "../../redux/actions";

class LoginForm extends Component {

    state = {
        formData : {}
    }

    /**
     * Generic form input change handler, can be used as a handler for any form input
     * to update the value of the input in the state.
     *
     * @param event
     */
    handleInputChange = (event) =>  {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        //this may result in a duplicate key.
        this.setState(
            {
                formData: {
                    ...this.state.formData,
                    [name]: value
                }
            });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        this.props.login(this.state.formData);
    }

    render(){
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <FormField>
                    <Input iconPosition={'right'} placeholder={'email address or username'} name={'username'} onChange={this.handleInputChange} size={'small'} >
                        <Icon name='user' />
                        <input />
                    </Input>
                </FormField>
                <FormField>
                    <Input iconPosition={'right'} placeholder={'password'} size={'small'} name={'password'} onChange={this.handleInputChange} size={'small'} type={'password'}>
                        <Icon name='lock' />
                        <input />
                    </Input>
                </FormField>
            </Form>
        )
    }
}

export default connect(null,{login})(LoginForm);