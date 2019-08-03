package com.sirhc.demo.reactmapboxapi.account.service;

import com.sirhc.demo.reactmapboxapi.account.dto.AuthenticationRequest;
import com.sirhc.demo.reactmapboxapi.account.jwt.JwtTokenProvider;
import com.sirhc.demo.reactmapboxapi.account.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository users;

    public AuthenticationService(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserRepository users) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.users = users;
    }

    public String getValidationToken(AuthenticationRequest data)
    {
        String username = data.getUsername();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, data.getPassword())
        );
        String token = jwtTokenProvider.createToken(username,
                this.users.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found"))
                        .getRoles().stream()
                        .map(role -> role.getName())
                        .collect(Collectors.toList())
        );

        return token;
    }
}
