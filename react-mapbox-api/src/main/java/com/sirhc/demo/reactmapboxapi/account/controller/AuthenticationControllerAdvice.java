package com.sirhc.demo.reactmapboxapi.account.controller;

import com.sirhc.demo.reactmapboxapi.account.dto.AuthenticationResponse;
import com.sirhc.demo.reactmapboxapi.account.jwt.InvalidJwtAuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ValidationException;

/**
 * Global Controller Advice
 * handles exceptions propagated to the Controller ensuring the correct 401 (Unauthorized) responses is generated
 *
 */
@ControllerAdvice
public class AuthenticationControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler({InvalidJwtAuthenticationException.class, BadCredentialsException.class, AuthenticationException.class})
    public ResponseEntity<String> handleInvalidJwtAuthenticationException(Exception ex, WebRequest request)
    {
        return new ResponseEntity(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

}
