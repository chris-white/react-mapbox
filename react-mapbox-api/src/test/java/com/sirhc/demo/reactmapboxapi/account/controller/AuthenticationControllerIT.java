package com.sirhc.demo.reactmapboxapi.account.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sirhc.demo.reactmapboxapi.account.dto.AuthenticationRequest;
import com.sirhc.demo.reactmapboxapi.account.jwt.JwtTokenProvider;
import com.sirhc.demo.reactmapboxapi.account.repository.UserRepository;
import com.sirhc.demo.reactmapboxapi.dto.AddressSearchRequestDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/* The SpringExtension allows access to the spring environment within the context of a unit Test
* It is added by default in 2.1.0 +  versions of spring-starter-test */
@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String token;

    @BeforeEach
    public void authorizeTestUser(){

        // get token manually
        token = jwtTokenProvider.createToken("test", Stream.of("USER").collect(Collectors.toList()));
    }

    @Test
    public void testUserExists() throws Exception {
        Assertions.assertNotNull(userRepository.findByUsername("test").get());
    }

    @Test
    public void canLogin() throws Exception {

        AuthenticationRequest authenticationRequest = new AuthenticationRequest("test", "password");

        mockMvc.perform(
                post("/auth/signin")
                        .content(objectMapper.writeValueAsString(authenticationRequest))
                        .contentType("application/json")
        ).andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(content().string(containsString("token")))
        .andExpect(content().string(containsString("username")));
    }

    @Test
    public void canRequestSecuredResourceWithToken() throws Exception {

        // auth by token
        mockMvc.perform(
                post("/addressSearch")
                        .content(objectMapper.writeValueAsString(new AddressSearchRequestDto("17 Hedley Place", null, null)))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void canRequestSecuredResourceWithUsernamePassword() throws Exception {
        mockMvc.perform(
                post("/addressSearch")
                        .content(objectMapper.writeValueAsString(new AddressSearchRequestDto("17 Hedley Place", null, null)))
                        .requestAttr("username", "test")
                        .requestAttr("password", "password")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void cannotRequestSecuredResourceWithoutTokenOrUsernamePassword() throws Exception {

        // authentication should fail
        mockMvc.perform(
                post("/addressSearch")
                        .content(objectMapper.writeValueAsString(new AddressSearchRequestDto("17 Hedley Place", null, null)))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void supportsCORSPreflightRequests() throws RuntimeException {

        Stream.of("/auth/signin", "/addressSearch","/findAddressByPlaceId").forEach(url -> {
                try{
                    mockMvc.perform(options(url)).andExpect(status().isOk());
                }catch (Exception e ) {
                    throw new RuntimeException(e);
                }
            }
        );
    }

}
