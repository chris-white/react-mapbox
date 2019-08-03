import _ from 'lodash';
import axios from 'axios';

/**
 * An axios search instance for the performing Address Searches
 */
const restLogin = axios.create({
    baseURL: 'http://localhost:8080/auth',
    timeout: 2000
});

/**
 * Returns a list of possible addresses for the search term.
 *
 * @param searchTerm
 */
export const login = async (username, password) =>
{

    // default params
    let data = {username, password}

    try {

        // await response before continuing function execution.
        const response  = await restLogin.post('/signin', data, axiosRestOptions());

        if (response && (response.status === 200 || response.status === 400))
        {
            // return only the content of the JSON request body
            return response.data;
        }
        else {
            return {error : true, errorMessage : "Unexpected Response from Server"}
        }
    }
    catch (e)
    {
        return {error : true, errorMessage : "Unexpected Error"}
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

