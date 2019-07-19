import React, {Component} from 'react'
import mapboxgl from 'mapbox-gl'

// import { OSMLiberty } from '../service/VectorMapStyleService'

import './Map.css';

class Map extends Component {

    state = {
        mapboxApiAccessToken: "pk.eyJ1IjoiY2hyaXN3aGl0ZTg5IiwiYSI6ImNqeTJzMGQ1azByeTUzbW81eGJtMTB2NzEifQ.5OQqP3LpYuJOA2iCTD_C8Q"
    };

    constructor(props) {
        super(props);
        this.mapCss = {
            // width: '100vw',
            // height: '100vh',
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
        this.map = this.createMap()

        this.map.on('load', () => {
            // this.map.addLayer(this.mapBoxLayer())
            this.map.addLayer(this.osmVectorLayer())
        })

        // this.map.addLayer(this.mapBoxLayer())
    }

    createMap = () => {
        return new mapboxgl.Map({
            container: 'mapbox-gl-map',
            zoom: 13,
            center: this.mapCenter,
            style: 'http://localhost:8080/styles/osm-liberty/style.json'
            // style: 'https://api.maptiler.com/maps/66e665b5-c8bd-4e4e-8296-a67ae21f0ff8/style.json?key=Vds451goKUrAI4u6TTQb'
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
                url: 'http://localhost:8080/'
            }
        }
    }
}


export default Map