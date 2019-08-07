package com.sirhc.demo.reactmapboxapi.account.controller;

import com.sirhc.demo.reactmapboxapi.account.dto.AuthenticationRequest;
import com.sirhc.demo.reactmapboxapi.account.dto.AuthenticationResponse;
import com.sirhc.demo.reactmapboxapi.account.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @CrossOrigin
    @PostMapping(value = "/signin", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity signin(@RequestBody AuthenticationRequest data) {

        try {
            String token = authenticationService.getValidationToken(data);

            return ok(new AuthenticationResponse(data.getUsername(), token));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
}