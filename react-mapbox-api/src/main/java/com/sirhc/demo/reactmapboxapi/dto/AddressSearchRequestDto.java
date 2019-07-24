package com.sirhc.demo.reactmapboxapi.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressSearchRequestDto {
    String searchTerm;
    String tokenUUID;
    LatLngDto userLocation;
}
