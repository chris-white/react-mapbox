import React, { Component, Fragment} from 'react';

import {Form, FormField, FormButton, Input, Icon, Message} from 'semantic-ui-react';
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

        this.setState({
            formData : {
                username : this.state.username,
                password : ""
            }
        });
    }

    renderFormErrors = () => {

        if (this.props.response.error) {
            return (
                <Message
                    error
                    header='Login Unsuccessful'
                    content={this.props.response.errorMessage}
                />
            )
        }
    }

    render(){

        let error = this.props.response.error ? true : false;

        return (
            <Form onSubmit={this.handleFormSubmit} error={error}>

                {this.renderFormErrors()}

                <FormField>
                    <Input value={this.state.formData.username} icon='user' iconPosition={'right'} placeholder={'email address or username'} name={'username'} onChange={this.handleInputChange} size={'small'} >
                    </Input>
                </FormField>
                <FormField>
                    <Input value={this.state.formData.password} icon='lock' iconPosition={'right'} placeholder={'password'} size={'small'} name={'password'} onChange={this.handleInputChange} size={'small'} type={'password'} >
                    </Input>
                </FormField>
                <Form.Button content={'login'} />
            </Form>
        )
    }
}

/**
 * maps the response from the login server from the redux state
 *
 * @param state
 * @returns {{response: *}}
 */
const mapStateToProps = (state) => {
    return {
        response: state.loginFormErrors
    }
}

export default connect(mapStateToProps,{login})(LoginForm);