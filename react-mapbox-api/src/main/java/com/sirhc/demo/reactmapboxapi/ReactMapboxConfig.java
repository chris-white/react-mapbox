package com.sirhc.demo.reactmapboxapi;

import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReactMapboxConfig {

    private static final String API_KEY = "AIzaSyBGBdodgI6Z6bX9ws_vXE31idkJPl9tVek";

    @Bean
    GeoApiContext getGeoContextApi(){
        return new GeoApiContext.Builder()
                .apiKey(API_KEY)
                .build();
    }
}
