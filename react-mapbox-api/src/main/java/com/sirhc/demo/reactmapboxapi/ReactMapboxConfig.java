package com.sirhc.demo.reactmapboxapi;

import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReactMapboxConfig {

    @Value("${react-mapbox-api.google-places-api.key}")
    private final String API_KEY;

    @Bean
    GeoApiContext getGeoContextApi(){
        return new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();
    }
}
