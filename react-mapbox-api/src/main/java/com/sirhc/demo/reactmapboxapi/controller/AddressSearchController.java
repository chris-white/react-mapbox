package com.sirhc.demo.reactmapboxapi.controller;

import com.sirhc.demo.reactmapboxapi.dto.*;
import com.sirhc.demo.reactmapboxapi.service.GooglePlacesService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AddressSearchController
{
    private final GooglePlacesService googlePlacesService;

    public AddressSearchController(GooglePlacesService googlePlacesService) {
        this.googlePlacesService = googlePlacesService;
    }

    /**
     * Returns suggested addresses for the specified searchTerm.
     *
     * @return
     */
    @CrossOrigin
    @PostMapping(path = "/addressSearch", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AddressAutoCompleteDto> addressSearch(
            @RequestBody AddressSearchRequestDto request)
    {
        return ResponseEntity.ok().body(googlePlacesService.findAddressesBySearchTerm(request));
    }

    @CrossOrigin
    @PostMapping(path = "/findAddressByPlaceId", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AddressDetailsDto> findAddressByPlaceId(
            @RequestBody AddressDetailsRequestDto request)
    {
        return ResponseEntity.ok().body(googlePlacesService.findAddressByPlaceId(request));
    }
}
