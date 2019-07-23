import _ from 'lodash';
import axios from 'axios';

/**
 * An axios search instance for the performing Address Searches
 */
const addressSearch = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 2000
});

/**
 * Returns a list of possible addresses for the search term.
 *
 * @param searchTerm
 */
export const findAddress = async (searchTerm, tokenUUID) =>
{
    let options = {
        responseType: 'json',
        params: {
            searchTerm : searchTerm,
            tokenUUID : tokenUUID
        }
    }

    // await response before continuing function execution.
    const response  = await addressSearch.get('/addressSearch', options);

    if (response && response.status === 200) {
        // return only the content of the JSON request body
        return response.data;
    }
    else {
        // TODO: handle any error cases here (Modal popup error etc.)
    }
}

export const findAddressByPlaceId = async (placeId, tokenUUID) =>
{
    let options = {
        responseType: 'json',
        params: {
            placeId : placeId,
            tokenUUID : tokenUUID
        }
    }

    // await response before continuing function execution.
    const response  = await addressSearch.get('/findAddressByPlaceId', options);

    if (response && response.status === 200) {
        // return only the content of the JSON request body
        return response.data;
    }
    else {
        // TODO: handle any error cases here (Modal popup error etc.)
    }
}

