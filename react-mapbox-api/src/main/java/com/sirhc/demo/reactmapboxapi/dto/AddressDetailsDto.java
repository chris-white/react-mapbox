package com.sirhc.demo.reactmapboxapi.dto;

import com.google.maps.model.PlaceDetails;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressDetailsDto {

    Boolean error;
    AddressSearchErrorType errorType;
    PlaceDetails details;
    String tokenUUID;

    public AddressDetailsDto(Boolean error, AddressSearchErrorType errorType, PlaceDetails details, String tokenUUID) {
        this.error = error;
        this.errorType = errorType;
        this.details = details;
        this.tokenUUID = tokenUUID;
    }
}
