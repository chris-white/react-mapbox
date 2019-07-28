import React, { Component, Fragment} from 'react';
import './MenuButton.css';
import {Button, Icon} from "semantic-ui-react";

import {toggleMenu} from "../../redux/actions";

import {connect} from "react-redux";


class MenuButton extends Component {

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
        showMenu: state.ui.showMenu
    }
}

export default connect(mapStateToProps, {toggleMenu})(MenuButton);