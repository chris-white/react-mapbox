package com.sirhc.demo.reactmapboxapi.controller;

import com.sirhc.demo.reactmapboxapi.dto.AddressAutoCompleteDto;
import com.sirhc.demo.reactmapboxapi.dto.AddressDetailsDto;
import com.sirhc.demo.reactmapboxapi.service.GooglePlacesService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
     * @param searchTerm
     * @return
     */
    @GetMapping(path = "/addressSearch", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AddressAutoCompleteDto> addressSearch(@RequestParam("searchTerm") String searchTerm, @RequestParam(value = "tokenUUID", required = false) String tokenUUID)
    {
        AddressAutoCompleteDto dto = googlePlacesService.findAddressesBySearchTerm(searchTerm, tokenUUID);

        return ResponseEntity.ok()
                .headers(getDefaultResponseHeaders())
                .body(dto);
    }

    @GetMapping(path = "/findAddressByPlaceId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AddressDetailsDto> findAddressByPlaceId(@RequestParam("placeId") String placeId, @RequestParam(value = "tokenUUID", required = false) String tokenUUID)
    {
        AddressDetailsDto dto = googlePlacesService.findAddressByPlaceId(placeId, tokenUUID);

        return ResponseEntity.ok()
                .headers(getDefaultResponseHeaders())
                .body(dto);
    }

    private HttpHeaders getDefaultResponseHeaders()
    {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        return responseHeaders;
    }
}
