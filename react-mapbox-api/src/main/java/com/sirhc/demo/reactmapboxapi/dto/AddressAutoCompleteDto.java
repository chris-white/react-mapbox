package com.sirhc.demo.reactmapboxapi.dto;

import com.google.maps.model.AutocompletePrediction;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 *
 */
@Data
@NoArgsConstructor
public class AddressAutoCompleteDto {
    Boolean error;
    AddressSearchErrorType errorType;
    String tokenUUID;
    List<AutocompletePrediction> results;

    public AddressAutoCompleteDto(List<AutocompletePrediction> results, AddressSearchErrorType errorType, Boolean error, String tokenUUID) {
        this.errorType = errorType;
        this.results = results;
        this.error = error;
        this.tokenUUID = tokenUUID;
    }


}
