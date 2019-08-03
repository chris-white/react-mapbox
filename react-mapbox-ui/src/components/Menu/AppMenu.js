import React, { Component } from 'react'
import {connect} from 'react-redux';

import {Menu, Sidebar, Segment, Icon } from 'semantic-ui-react'
import UserCard from './UserCard/UserCard';

import {showLogin} from "../../redux/actions";


/**
 * Primary application menu.
 *
 * Makes use of the Semantic UI Sidebar, content that is to be pushed or that the sidebar
 * overlays (The Map) is contained within a sidebar pusher.
 *
 */
class AppMenu extends Component {

    loginClicked = (e, {name}) => {
        this.props.showLogin(true);
    }

    render(){
        return (
            <div style={{width: '100vw', height: '100vh'}}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        // inverted
                        // onHide={this.handleSidebarHide}
                        vertical
                        visible={this.props.showMenu}
                        width='wide'
                        style={{backgroundColor : 'rgb(255,255,255,0.7)'}}
                    >

                        {/*display the logged in user if user is logged in*/}
                        {this.props.login.username ?
                            <UserCard /> :
                            <Menu.Item as='a' name={"login"} onClick={this.loginClicked}>
                                <Icon name='sign-in' size='small'/>
                                Login
                            </Menu.Item>
                        }

                    </Sidebar>

                    <Sidebar.Pusher>

                        {/*children will be the map*/}
                        {this.props.children}

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showMenu: state.ui.showMenu,
        login: state.login
    }
}

export default connect(mapStateToProps, {showLogin})(AppMenu);