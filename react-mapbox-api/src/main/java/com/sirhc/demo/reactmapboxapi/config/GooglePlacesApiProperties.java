package com.sirhc.demo.reactmapboxapi.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;

@ConfigurationProperties(prefix = "google-api")
@Data
@NoArgsConstructor
public class GooglePlacesApiProperties {

    private String key;
}
