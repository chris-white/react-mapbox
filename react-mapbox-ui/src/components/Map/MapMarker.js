import React, {Component} from 'react'
import './Map.css';
import {Icon, Popup, Grid, GridColumn, GridRow, Header} from 'semantic-ui-react';

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
                    size={'large'}
                    position='top center'
                    on={'hover'}
                    trigger={
                        <Icon className={'marker'} name={'map marker alternate'} size={'big'} color={'blue'}/>
                    }
                >
                    {this.renderPropertyDetails()}
                </Popup>
            </div>
        );
    }

    renderPropertyDetails = () => {

        return (
            <Grid>
                <GridRow>
                    <Header style={{textAlign: 'center'}} >{this.props.address.formattedAddress}</Header>
                </GridRow>
                {this.renderFieldAddress()}
                {this.renderFieldLinkToGoogle()}
            </Grid>
        )
    }

    renderFieldAddress = () => {
        return (
            <GridRow>
                <GridColumn width={'6'}>
                    <b>Address </b>
                </GridColumn>
                <GridColumn width={'10'}>
                    <div>{this.props.address.formattedAddress}</div>
                </GridColumn>
            </GridRow>
        )
    }

    renderFieldLinkToGoogle = () => {

        return (
            <GridRow>
                <GridColumn style={{textAlign: 'center'}}>
                    View on <a href={this.props.address.url} target="_blank">Google Maps</a>
                </GridColumn>
            </GridRow>
        )
    }
}

export default MapMarker;