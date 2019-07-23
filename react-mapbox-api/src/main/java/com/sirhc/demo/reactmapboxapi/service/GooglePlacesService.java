package com.sirhc.demo.reactmapboxapi.service;

import com.google.maps.GeoApiContext;
import com.google.maps.PlaceAutocompleteRequest;
import com.google.maps.PlacesApi;
import com.google.maps.model.AutocompletePrediction;
import com.google.maps.model.ComponentFilter;
import com.google.maps.model.PlaceDetails;
import com.sirhc.demo.reactmapboxapi.dto.AddressDetailsDto;
import com.sirhc.demo.reactmapboxapi.dto.AddressSearchErrorType;
import com.sirhc.demo.reactmapboxapi.dto.AddressAutoCompleteDto;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.UUID;

/**
 * A Service for querying the Google Places API.
 *
 * This service uses generated version 4 UUID's as token to identify a users session. visit https://developers.google.com/places/web-service/session-tokens for more information of session tokens.
 *
 */
@Service
public class GooglePlacesService {

    private final GeoApiContext geoApiContext;

    private ComponentFilter componentFilter;

    public GooglePlacesService(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;

        this.componentFilter = new ComponentFilter("country", "AU");
    }

    /**
     * Request a list of suggested places from the autocomplete service.
     *
     * @param searchTerm
     * @param tokenUUID
     * @return
     */
    public AddressAutoCompleteDto findAddressesBySearchTerm(String searchTerm, String tokenUUID){

        PlaceAutocompleteRequest.SessionToken token = getUUIDfromToken(tokenUUID);

        try {
            AutocompletePrediction[] searchResults = PlacesApi
                    .placeAutocomplete(geoApiContext,searchTerm, token)
                    .components()
                    .await();

            return new AddressAutoCompleteDto(Arrays.asList(searchResults), AddressSearchErrorType.NONE, false, token.getUUID().toString());
        }
        catch (Exception e)
        {
            return new AddressAutoCompleteDto(null, AddressSearchErrorType.INTERNAL_ERROR, true, token.getUUID().toString());
        }
    }

    /**
     * Find the details of the selected address / place from the autocomplete session by placeId.
     *
     * Basic place lookups with a existing autocomplete session are uncharged so pass the tokenUUID from the autocomplete sessions
     *
     * @param placeId
     * @param tokenUUID
     * @return
     */
    public AddressDetailsDto findAddressByPlaceId(String placeId, String tokenUUID){

        PlaceAutocompleteRequest.SessionToken token = getUUIDfromToken(tokenUUID);

        try {
            PlaceDetails placeDetails =  PlacesApi.placeDetails(geoApiContext,
                    placeId, token).await();

            return new AddressDetailsDto(false, AddressSearchErrorType.NONE, placeDetails, token.getUUID().toString());
        }
        catch (Exception e)
        {
            return new AddressDetailsDto(true, AddressSearchErrorType.INTERNAL_ERROR, null, token.getUUID().toString());
        }
    }

    /**
     * Attempt to assign a SessionToken from the UUID, if unsuccessful assume this is the first request in the autocomplete session
     * and return a newly generated token.
     *
     * @param tokenUUID
     * @return
     */
    private PlaceAutocompleteRequest.SessionToken getUUIDfromToken(String tokenUUID){
        PlaceAutocompleteRequest.SessionToken token;

        if (StringUtils.isEmpty(tokenUUID)){
            token = new PlaceAutocompleteRequest.SessionToken();
        }
        else {
            token = new PlaceAutocompleteRequest.SessionToken(UUID.fromString(tokenUUID));
        }

        return token;
    }

}
