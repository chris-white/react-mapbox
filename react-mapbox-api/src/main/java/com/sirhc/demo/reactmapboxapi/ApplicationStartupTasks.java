package com.sirhc.demo.reactmapboxapi;


import com.sirhc.demo.account.service.UserService;
import com.sirhc.demo.reactmapboxapi.config.ReactMapboxConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * Tasks to be executed after the application has started
 */
@Component
public class ApplicationStartupTasks
        implements ApplicationListener<ApplicationReadyEvent> {

    UserService userService;
    Logger logger = LoggerFactory.getLogger(this.getClass());


    public ApplicationStartupTasks(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        logger.info("Creating test user");
        userService.createUser("test", "password");
        return;
    }

}
