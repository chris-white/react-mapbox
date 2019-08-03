package com.sirhc.demo.account.service;

import com.sirhc.demo.account.domain.User;

public interface UserService {

    /**
     * Create the user in the database.
     */
    public User createUser(String username, String password);

    void save(User user);

    User findByUsername(String username);
}
