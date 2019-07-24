package com.sirhc.demo.reactmapboxapi.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddressDetailsRequestDto {
    String placeId;
    String tokenUUID;
}
