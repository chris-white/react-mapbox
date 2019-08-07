package com.sirhc.demo.reactmapboxapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressSearchRequestDto {
    String searchTerm;
    String tokenUUID;
    LatLngDto userLocation;
}
