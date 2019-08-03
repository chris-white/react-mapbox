package com.sirhc.demo.account.service;

public interface SecurityService {
    String findLoggedInUsername();

    void autoLogin(String username, String password);
}
