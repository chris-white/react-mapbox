package com.sirhc.demo.account.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sirhc.demo.account.controller.AuthenticationController;
import com.sirhc.demo.account.dto.AuthenticationRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/* The SpringExtension allows access to the spring environment within the context of a unit Test
* It is added by default in 2.1.0 +  versions of spring-starter-test */
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = AuthenticationController.class)
public class AuthenticationControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void canAccessLoginWhenNotLoggedIn() throws Exception {

        AuthenticationRequest authenticationRequest = new AuthenticationRequest("test", "password");

        mockMvc.perform(
                post("/signin")
                        .content(objectMapper.writeValueAsString(authenticationRequest))
                        .contentType("application/json")
        ).andExpect(status().isOk());

    }
}
