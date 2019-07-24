import React, {Component} from 'react'
import './Map.css';
import {Icon, Popup} from 'semantic-ui-react';

class MapMarker extends Component {

    constructor(props) {
        super(props);
        this.myRef = props.ref;
    }

    render(){
        return (
            <div id="primaryMapMarker" ref={this.myRef}>
                <Popup
                    position='top center'
                    trigger={
                        <Icon className={'marker'} name={'map marker alternate'} size={'big'} color={'blue'}/>
                    }
                >
                    <Popup.Header>Address Details</Popup.Header>
                    <Popup.Content>
                        <p>Put all that google info here</p>
                    </Popup.Content>
                </Popup>
            </div>
        );
    }
}

export default MapMarker;