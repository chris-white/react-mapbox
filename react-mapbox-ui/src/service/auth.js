/**
 * Global information about the currently authenticated user.
 *
 * This information is available and can be retrieved from the redux store by react-redux connected components.
 * but is also exported here by the redux login reducer to prevent the need to connect services to the redux store and/or force every component
 * using the service to retrieve the token from the store and pass it in manually.
 */
export var jwtToken = "";

export const setJwtToken = (newJwtToken) => {
    jwtToken = newJwtToken;
}