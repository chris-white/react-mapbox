package com.sirhc.demo.reactmapboxapi.account.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "com.sirhc.demo.reactmapboxapi.account")
@EnableJpaRepositories(basePackages = "com.sirhc.demo.reactmapboxapi.account.repository")
@EntityScan(basePackages = "com.sirhc.demo.reactmapboxapi.account")
public class AccountConfig {

}
