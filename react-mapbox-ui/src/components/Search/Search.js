import React, { Component } from 'react'
import {connect} from 'react-redux';
import {selectAddress, searchUpdated} from '../../redux/actions';

import _ from 'lodash';

import { Search as SemanticSearch, Button, Icon} from 'semantic-ui-react'

import './Search.css';

class Search extends Component {

    state = {
        value : '200 Bourke St',
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
        this.props.selectAddress(result["data-result"].placeId, this.props.searchToken);
    }

    /**
     * Renders a single result in the Search results drop down list
     *
     * @param result
     * @returns {*}
     */
    resultRenderer = (result) => {
        let dataResult = result["data-result"];

        return (
            <p>{dataResult.description}</p>
        )
    }

    /**
     * Fetch results from a debounced search function querying the REST backend to return a set of Address Search Results from
     * the Google Places API.
     *
     * @param e
     */
    onSearchChange = (e, {value}) => {
        this.setState({value : value});
        this.addressSearch(value);
    }

    /**
     * Fetch address results from rest API.
     */
    addressSearch = (searchTerm) => {
        this.setState({isLoading: true})

        this.props.searchUpdated(searchTerm, this.props.searchToken, this.props.userLocation);

        // set the tokenUUID for the autocomplete session returned by the service.
        this.setState({isLoading: false});
    }

    render() {
        return (
            <React.Fragment>
                <SemanticSearch
                    fluid size={'huge'}
                    value={this.state.value}
                    results={this.props.searchResults}
                    onResultSelect={this.onResultSelect}
                    onSearchChange={this.onSearchChange}
                    resultRenderer={this.resultRenderer}
                    minCharacters={6}
                    loading={this.state.isLoading}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchResults : transformSearchResultsForSemanticSearch(state.searchResults),
        searchToken : state.searchToken,
        userLocation : state.userLocation};
}

/**
 * The Search component of Semantic UI React passes all unknown props from results array entries to a SearchResult entry.
 * This pollutes the DOM with invalid properties, the work around here passes the properties to data-result so the resulting rendered
 * dom element has a data-result attribute populated with the required data.
 *
 * @param searchResults
 * @returns {*}
 */
const transformSearchResultsForSemanticSearch = (searchResults) => {

    if (_.isEmpty(searchResults)){
        return;
    }

    let modifiedArray = searchResults.map((result) => {
        return {key : result.placeId, "data-result" : {...result}}
    });

    return modifiedArray;
}

export default connect(mapStateToProps,{ selectAddress, searchUpdated })(Search);