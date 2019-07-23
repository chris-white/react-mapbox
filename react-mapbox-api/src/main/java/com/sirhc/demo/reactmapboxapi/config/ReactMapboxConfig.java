package com.sirhc.demo.reactmapboxapi.config;

import com.google.maps.GeoApiContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@Configuration
@PropertySources({
    @PropertySource("classpath:application.properties"),
    @PropertySource("classpath:google-api.properties")
})
public class ReactMapboxConfig {

    ReactMapboxApiProperties appProperties;
    GooglePlacesApiProperties googleApiProperties;

    Logger logger = LoggerFactory.getLogger(ReactMapboxConfig.class);

    public ReactMapboxConfig(ReactMapboxApiProperties appProperties, GooglePlacesApiProperties googleApiProperties) {
        this.appProperties = appProperties;
        this.googleApiProperties = googleApiProperties;
    }

    @Bean
    GeoApiContext getGeoContextApi(){

        return new GeoApiContext.Builder()
                .apiKey(googleApiProperties.getKey())
                .build();
    }
}
