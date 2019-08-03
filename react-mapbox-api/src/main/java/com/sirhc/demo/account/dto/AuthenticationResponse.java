package com.sirhc.demo.account.dto;

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
