import React, { Component} from 'react';

import {Modal} from 'semantic-ui-react';
import {connect} from "react-redux";

import {showLogin} from "../../redux/actions";


import LoginForm from './LoginForm';

class LoginModal extends Component {

    render(){
        return (
            <Modal
                open={this.props.open}
                size={'small'}
                dimmer={'blurring'}
                closeOnEscape={true}
                closeOnDimmerClick={true}
                closeOnDocumentClick={true}
                closeIcon
                onClose={this.close}
            >
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }

    close = () => {
        this.props.showLogin(false);
    }

}

const mapStateToProps = (state) => {
    return {
        open: state.ui.showLogin
    }
}

export default connect(mapStateToProps, {showLogin})(LoginModal);