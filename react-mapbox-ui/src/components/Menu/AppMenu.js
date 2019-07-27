import React, { Component } from 'react'
import {connect} from 'react-redux';

import {Menu, Sidebar, Segment, Icon } from 'semantic-ui-react'

/**
 * Primary application menu.
 *
 * Makes use of the Semantic UI Sidebar, content that is to be pushed or that the sidebar
 * overlays (The Map) is contained within a sidebar pusher.
 *
 */
class AppMenu extends Component {

    render(){
        return (
            <div style={{width: '100vw', height: '100vh'}}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        // onHide={this.handleSidebarHide}
                        vertical
                        visible={this.props.showMenu}
                        width='wide'
                    >
                        <Menu.Item as='a'>
                            <Icon name='user' size='small'/>
                            Login
                        </Menu.Item>
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
        showMenu: state.showMenu
    }
}

export default connect(mapStateToProps)(AppMenu);