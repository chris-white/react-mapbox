import React, { Component } from 'react'
import {connect} from 'react-redux';
import {selectAddress, searchUpdated} from '../../redux/actions';

import _ from 'lodash';

import { Search as SemanticSearch} from 'semantic-ui-react'
import { findAddress, findAddressByPlaceId } from '../../service/SearchService';

import './Search.css';

class Search extends Component {

    state = {
        isLoading: false,
        tokenUUID: "",
        searchResults : {}
    }

    constructor (props){
        super(props)
    }

    /**
     * Dispatch event to the redux store with the selected record.
     *
     * @param e
     */
    onResultSelect = async (e, {result}) => {
        this.props.selectAddress(result.placeId, this.props.searchToken);
    }

    /**
     * Renders a single result in the Search results drop down list
     *
     * @param result
     * @returns {*}
     */
    resultRenderer = (result) => {
        return (
            <p>{result.description}</p>
        )
    }

    /**
     * Fetch results from a debounced search function querying the REST backend to return a set of Address Search Results from
     * the Google Places API.
     *
     * @param e
     */
    onSearchChange = (e, {value}) => {
        this.setState({searchValue : value});
        this.addressSearch(value);
    }

    /**
     * Fetch address results from rest API.
     */
    addressSearch = (searchTerm) => {
        this.setState({isLoading: true})

        this.props.searchUpdated(searchTerm, this.props.searchToken);

        // set the tokenUUID for the autocomplete session returned by the service.
        this.setState({isLoading: false});
    }

    render() {
        return (
            <div id={'searchContainer'}>
                <SemanticSearch fluid size={'huge'}
                                // value={this.state.searchValue}
                                results={this.props.searchResults}
                                onResultSelect={this.onResultSelect}
                                onSearchChange={this.onSearchChange}
                                resultRenderer={this.resultRenderer}
                                minCharacters={6}
                                loading={this.state.isLoading}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {searchResults : state.searchResults, searchToken : state.searchToken};
}

export default connect(mapStateToProps,{ selectAddress, searchUpdated })(Search);