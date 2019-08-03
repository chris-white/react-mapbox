package com.sirhc.demo.reactmapboxapi.account.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthenticationResponse {
    String username;
    String token;
    Boolean error;
    String errorMessage;
}
