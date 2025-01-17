import React, {Component} from 'react'
import ReactDOM from "react-dom";
import mapboxgl from 'mapbox-gl'

import {connect} from "react-redux";
import _ from 'lodash';

import {setUserLocation} from "../../redux/actions";
import './Map.css';

import MapMarker from './MapMarker';



class Map extends Component {

    state = {
        mapboxApiAccessToken: process.env.REACT_APP_MAP_MAPBOX_API_KEY
    };

    constructor(props) {
        super(props);
        this.mapCss = {
            position: 'absolute',
            top: 0, bottom: 0,
            width: '100%',
            zIndex: 1
        };
        this.darwin = [130.991197, -12.492045];
        this.australiaBounds = [
            [100.508598, -50.270123], // south west
            [170.128466, 0] // north east
        ];

        this.mapBounds = this.australiaBounds;
        this.mapCenter = this.darwin;
    }

    /**
     * Called once when the map is mounted
     */
    componentDidMount() {

        mapboxgl.accessToken = this.state.mapboxApiAccessToken
        this.map = this.createMap();

        // wait for the mapbox load event before loading third party layers.
        this.map.on('load', () => {
            this.map.addLayer(this.osmVectorLayer());
        });

        // request the users location.
        this.requestUserLocation();
    }

    componentDidUpdate() {
        this.moveToLocation();
    }

    /**
     * If a location has been set, move there
     */
    moveToLocation = () => {
        if (_.isEmpty(this.props.selectedAddress)){
            return
        }

        const {lng, lat} = this.props.selectedAddress.geometry.location;
        this.map.easeTo({
            center: [lng, lat],
            zoom: 18,
            curve: 1,
            speed: 2,
        });
    }

    /**
     *
     * @returns {Map|*|Function|Map<any, any>|Map|Map}
     */
    requestUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                this.setState({
                    userLocation: { lat: latitude, lng: longitude }
                    // loading: false
                });

                this.props.setUserLocation({userLocation: { lat: latitude, lng: longitude }});
            },
            () => {
                // this.setState({ loading: false });

            }
        );
    }

    createMap = () => {
        return new mapboxgl.Map({
            container: 'mapbox-gl-map',
            zoom: 13,
            center: this.mapCenter,
            style: process.env.REACT_APP_MAP_HOST + 'styles/osm-bright/style.json',
            maxBounds: this.mapBounds
        })
    }

    osmVectorLayer = () => {
        return {
            "source": {
                type: 'vector',
                url: process.env.REACT_APP_MAP_HOST
            }
        }
    }

    render(){
        return (
            <React.Fragment>
                <div id={'mapbox-gl-map'} style={this.mapCss}>
                </div>

                {/* Container div is hidden as mapbox will remove the rendered element from the container in the DOM and place it on the Map */}
                <div style={{display: 'none'}}>
                    {this.renderMapMarker()}
                </div>

            </React.Fragment>
        );
    }

    renderMapMarker() {
        if (!_.isEmpty(this.props.selectedAddress)) {
            const {lng, lat} = this.props.selectedAddress.geometry.location;

            return <MapMarker addMapMarker={this.addMapMarker} location={[lng, lat]} address={this.props.selectedAddress}/>
        }
    }

    /**
     * Adds a HTML marker to the map.
     *
     * @param markerElement react reference to the element to be drawn on the map.
     * @param location array of [lng, lat]
     */
    addMapMarker = (ref, location) => {
        new mapboxgl.Marker(ref)
            .setLngLat(location)
            .addTo(this.map);
    }
}

const mapStateToProps = (state) => {
    return {selectedAddress : state.selectedAddress};
}

export default connect(mapStateToProps, { setUserLocation })(Map);