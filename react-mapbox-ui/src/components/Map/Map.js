import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

import {connect} from "react-redux";
import _ from 'lodash';

import {setUserLocation} from "../../redux/actions";
import './Map.css';



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

    render(){
        return (
            <div id={'mapbox-gl-map'} style={this.mapCss}>
            </div>
        );
    }




    /**
     * Called once when the map is mounted
     */
    componentDidMount() {

        mapboxgl.accessToken = this.state.mapboxApiAccessToken
        this.map = this.createMap();

        // wait for the mapbox load event before loading third party layers.
        this.map.on('load', () => {
            // this.map.addLayer(this.mapBoxLayer())
            this.map.addLayer(this.osmVectorLayer())
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

    // Custom layers (From external sources)
    mapBoxLayer = () => {
        return {
            "id": "terrain-data",
            "type": "line",
            "source": {
                type: 'vector',
                url: 'mapbox://mapbox.mapbox-terrain-v2'
            },
            "source-layer": "contour",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#4d95ff",
                "line-width": 1
            }
        }
    }

    osmVectorLayer = () => {
        return {
            "source": {
                type: 'vector',
                url: process.env.REACT_APP_MAP_HOST
            }
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {selectedAddress : state.selectedAddress};
}

export default connect(mapStateToProps, { setUserLocation })(Map);