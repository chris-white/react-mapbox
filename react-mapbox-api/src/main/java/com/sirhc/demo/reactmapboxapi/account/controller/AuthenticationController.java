package com.sirhc.demo.reactmapboxapi.account.controller;

import com.sirhc.demo.reactmapboxapi.account.dto.AuthenticationRequest;
import com.sirhc.demo.reactmapboxapi.account.service.AuthenticationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

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

            Map<Object, Object> model = new HashMap<>();
            model.put("username", data.getUsername());
            model.put("token", token);
            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
}