package com.sirhc.demo.reactmapboxapi.account.service;

public interface SecurityService {
    String findLoggedInUsername();

    void autoLogin(String username, String password);
}
