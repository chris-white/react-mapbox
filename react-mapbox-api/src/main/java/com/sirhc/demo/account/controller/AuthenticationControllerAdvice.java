package com.sirhc.demo.account.controller;

import com.sirhc.demo.account.dto.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ValidationException;

/**
 * Controller Advice specifically for the {@link AuthenticationController} class.
 * handles exceptions propagated to the Controller converting to suitable JSON responses for the react front-end.
 *
 */
@ControllerAdvice(assignableTypes = {AuthenticationController.class})
public class AuthenticationControllerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ValidationException.class, BadCredentialsException.class})
    public ResponseEntity<AuthenticationResponse> handleAccessDeniedException(Exception ex, WebRequest request)
    {
        AuthenticationResponse r = new AuthenticationResponse();
        r.setErrorMessage(ex.getMessage());
        r.setError(true);

        return ResponseEntity.ok().body(r);
    }

}
