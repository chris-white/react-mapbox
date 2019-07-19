import React, { Component } from 'react'
import { Search as SemanticSearch} from 'semantic-ui-react'
import _ from 'lodash';

import './Search.css';

class Search extends Component {

    state = {
        searchResults : {}
    }

    constructor (props){
        super(props)

        // TODO: add lodash debounced search to minimise spam to the spring service
    }

    /**
     * Dispatch event to the redux store with the selected record.
     *
     * @param e
     */
    onResultSelect = (e, data) => {

    }

    /**
     * Fetch results from a debounced search function querying the REST backend to return a set of Address Search Results from
     * the Google Places API.
     *
     * @param e
     */
    onSearchChange = (e, searchTerm) => {
        this.setState({searchValue : searchTerm});

        this.debouncedAddressSearch();
    }

    debouncedAddressSearch = () => {
        _.debounce(this.addressSearch, 500, {leading: true});
    }

    /**
     * Fetch address results from rest API.
     */
    addressSearch = () => {

    }

    render() {
        return (
            <div id={'searchContainer'}>
                <SemanticSearch fluid size={'huge'}
                                // value={this.state.searchValue}
                                results={this.state.searchResults}
                                onResultSelect={this.onResultSelect}
                                onSearchChange={this.onSearchChange}/>
            </div>
        )
    }
}

export default Search