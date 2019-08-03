
import React, { Component } from 'react'
import {connect} from 'react-redux';

import {Card, Image, Button} from 'semantic-ui-react'

import {logout} from "../../../redux/actions";

import defaultUserImg from '../../../images/anon.jpg';

class UserCard extends Component {

    logout = () =>  {
        this.props.logout();
    }

    render(){
        return (
            <Card fluid>
                <Card.Content>
                    <Image floated='left' size='small' src={defaultUserImg} />
                    <Card.Header floated='left'>Test User</Card.Header>
                    <Card.Meta floated='left'>Basic User</Card.Meta>
                    <Card.Description>
                        <div className='ui two buttons'>
                            <Button icon={'id card'} basic color='green' content={'Account'} />
                            <Button icon={'sign-out'} basic color='red' content={'Logout'} onClick={this.logout}/>
                        </div>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null,{logout})(UserCard);