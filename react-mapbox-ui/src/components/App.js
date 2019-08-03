import React, { Component, Fragment} from 'react';
import Search from './Search/Search';
import Map from './Map/Map';
import MenuButton from './Menu/MenuButton';
import AppMenu from './Menu/AppMenu';
import LoginModal from './Login/LoginModal';

import './App.css';

import '../semantic/dist/semantic.css';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import {connect} from "react-redux";
import {searchUpdated, selectAddress} from "../redux/actions";

class App extends Component {

  render() {
    return (
        <Fragment>

            <div id={'applicationTopBar'}>
                <div id={'menuButtonContainer'}>
                    <MenuButton />
                </div>

                {this.props.auth.token ?
                    <div id={'searchContainer'}>
                        <Search />
                    </div>
                    :
                    null
                }
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

const mapStateToProps = (state) => {
    return {
        auth : state.login
    };
}

export default connect(mapStateToProps)(App);
