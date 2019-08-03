package com.sirhc.demo.reactmapboxapi.account.jwt;

import org.springframework.security.core.AuthenticationException;

public class InvalidJwtAuthenticationException extends AuthenticationException {

	private static final long serialVersionUID = -761503632186596342L;

	public InvalidJwtAuthenticationException(String e) {
        super(e);
    }
}