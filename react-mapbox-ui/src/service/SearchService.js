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
export const findAddress = async (searchTerm, tokenUUID, userLocation) =>
{

    // default params
    let data = {
        searchTerm : searchTerm
    }

    // optional params
    if (!_.isEmpty(tokenUUID)){
        data.tokenUUID = tokenUUID;
    }

    if (!_.isEmpty(userLocation)){
        data.userLocation = userLocation;
    }

    try {

        // await response before continuing function execution.
        const response  = await addressSearch.post('/addressSearch', data, axiosRestOptions());

        if (response && response.status === 200) {
            // return only the content of the JSON request body
            return response.data;
        }
        else {
            return {error : true}
        }
    }
    catch (e)
    {
        return {error : true}
    }
}

export const findAddressByPlaceId = async (placeId, tokenUUID) =>
{
    // default params
    let data = {
        placeId : placeId
    }

    // optional params
    if (!_.isEmpty(tokenUUID)){
        data.tokenUUID = tokenUUID;
    }


    try {
        // await response before continuing function execution.
        const response  = await addressSearch.post('/findAddressByPlaceId', data , axiosRestOptions());

        if (response && response.status === 200) {
            // return only the content of the JSON request body
            return response.data;
        }
        else {
            return {error : true}
        }
    }
    catch (e){
        return {error : true}
    }
}


/**
 * Returns options for an axios POST request to a RESTFUL web service
 */
const axiosRestOptions = () => {
    return {
        responseType: 'json',
        headers: {
            "Content-Type": "application/json",
        }
    }
}

