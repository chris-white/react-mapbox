package com.sirhc.demo.reactmapboxapi.config;

import com.google.maps.GeoApiContext;
import com.sirhc.demo.reactmapboxapi.account.config.AccountConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.*;

@Configuration
@PropertySources({
    @PropertySource("classpath:application.properties"),
    @PropertySource("classpath:google-api.properties")
})
// import the Account Configuration class (the 'accounts' module lives under the package 'com.sirhc.demo.reactmapboxapi.account' which is not scanned by default.)
@Import(value = {AccountConfig.class})
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
