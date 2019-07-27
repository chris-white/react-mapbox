import React, { Component, Fragment} from 'react';
import './MenuButton.css';
import {Button, Icon} from "semantic-ui-react";

import {toggleMenu} from "../../redux/actions";

import {connect} from "react-redux";
import _ from 'lodash';


class MenuButton extends React.Component {

    render()
    {
        return (
            <Button id={'applicationTopBarMenuButton'} onClick={this.handleShowMenu}>
                <Icon name={'bars'} size={'big'}/>
            </Button>
        );

    }

    handleShowMenu = () => {
        this.props.toggleMenu(!this.props.showMenu);
    }
}

const mapStateToProps = (state) => {
    return {
        showMenu: state.showMenu
    }
}

export default connect(mapStateToProps, {toggleMenu})(MenuButton);