package com.sirhc.demo.reactmapboxapi.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "react-mapbox-api")
@Data
@NoArgsConstructor
public class ReactMapboxApiProperties {
    private String dummyProperty;
}
