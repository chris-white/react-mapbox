package com.sirhc.demo.reactmapboxapi.dto;

import com.google.maps.model.LatLng;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LatLngDto {
    /** The latitude of this location. */
    double lat;

    /** The longitude of this location. */
    double lng;

    public LatLng toLatLng(){
        return new LatLng(lat, lng);
    }
}



