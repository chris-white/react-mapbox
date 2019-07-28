import React, { Component, Fragment} from 'react';
import Search from './Search/Search';
import Map from './Map/Map';
import MenuButton from './Menu/MenuButton';
import AppMenu from './Menu/AppMenu';
import LoginModal from './Login/LoginModal';

import './App.css';

import '../semantic/dist/semantic.css';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'

class App extends Component {

  render() {
    return (
        <Fragment>

            <div id={'applicationTopBar'}>
                <div id={'menuButtonContainer'}>
                    <MenuButton />
                </div>
                <div id={'searchContainer'}>
                    <Search />
                </div>
            </div>

            {/*The app Menu pushes along the */}
            <AppMenu>
                <Map />
            </AppMenu>

            {/*Modals*/}
            <LoginModal />

        </Fragment>
    )
  }

}

export default App
