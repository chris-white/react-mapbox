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
        this.markerRef = React.createRef();
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

        this.addMapMarker();
    }

    /**
     * If a location has been set, move there
     */
    moveToLocation = () => {
        // selectedAddress not set, do nothing.
        if (_.isEmpty(this.props.selectedAddress)){
            return
        }

        const {lng, lat} = this.props.selectedAddress.geometry.location;
        this.map.flyTo({
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

                <div style={{display: 'none'}}>
                    {this.renderMapMarker()}
                </div>

            </React.Fragment>
        );
    }

    renderMapMarker(){
        if (!_.isEmpty(this.props.selectedAddress))
        {
            return <MapMarker ref={this.markerRef}/>
        }
    }

    /**
     * Adds the rendered markers to the map
     */
    addMapMarker(){

        if (!_.isEmpty(this.props.selectedAddress)) {

            // get the rendered dom element.
            let elbyref = ReactDOM.findDOMNode(this.markerRef.current);

            // marker location
            const {lng, lat} = this.props.selectedAddress.geometry.location;

            new mapboxgl.Marker(elbyref)
                .setLngLat([lng, lat])
                .addTo(this.map);
        }
    }
}

const mapStateToProps = (state) => {
    return {selectedAddress : state.selectedAddress};
}

export default connect(mapStateToProps, { setUserLocation })(Map);