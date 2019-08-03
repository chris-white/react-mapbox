package com.sirhc.demo.reactmapboxapi;

import com.sirhc.demo.reactmapboxapi.config.GooglePlacesApiProperties;
import com.sirhc.demo.reactmapboxapi.config.ReactMapboxApiProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

// disables default implementation of Spring Boot Security
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableConfigurationProperties({ReactMapboxApiProperties.class, GooglePlacesApiProperties.class})
public class ReactMapboxApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactMapboxApiApplication.class, args);
    }

}
