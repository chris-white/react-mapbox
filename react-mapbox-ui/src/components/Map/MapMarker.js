import React, {Component} from 'react'
import './Map.css';
import {Icon, Popup} from 'semantic-ui-react';

class MapMarker extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    /**
     * After component mounts and the dom element for a map marker is drawn
     * call the Mapbox API to add the marker dom element to the map.
     */
    componentDidMount = () => {
        this.addToMap();
    }

    componentDidUpdate = () => {
        this.addToMap();
    }

    addToMap = () => {
        this.props.addMapMarker(this.ref.current, this.props.location);
    }

    render(){
        return (
            <div id="primaryMapMarker" ref={this.ref}>
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