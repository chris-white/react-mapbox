import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

// import { OSMLiberty } from '../service/VectorMapStyleService'

import './Map.css';
import {connect} from "react-redux";

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
        this.california = [-122.447303, 37.753574];
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

        this.map.on('load', () => {
            // this.map.addLayer(this.mapBoxLayer())
            this.map.addLayer(this.osmVectorLayer())
        })
    }

    componentDidUpdate() {
        this.moveToLocation();
    }

    moveToLocation = () => {
        const {lng, lat} = this.props.selectedAddress.geometry.location;
        this.map.flyTo({
            center: [lng, lat],
            zoom: 18,
            curve: 1,
            speed: 2,
        });
    }

    createMap = () => {
        return new mapboxgl.Map({
            container: 'mapbox-gl-map',
            zoom: 13,
            center: this.mapCenter,
            style: process.env.REACT_APP_MAP_HOST + 'styles/osm-bright/style.json'
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

export default connect(mapStateToProps)(Map);