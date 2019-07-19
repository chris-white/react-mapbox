import React, { Component, Fragment} from 'react'
import Search from './Search/Search'
import Map from './Map/Map'

import './App.css'
import '../semantic/dist/semantic.css';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

class App extends Component {


  render() {
    return (
        <Fragment>
            <Search />
            <Map />
        </Fragment>
    )
  }

}

export default App
