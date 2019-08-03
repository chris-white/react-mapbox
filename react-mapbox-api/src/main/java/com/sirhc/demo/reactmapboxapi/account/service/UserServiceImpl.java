package com.sirhc.demo.reactmapboxapi.account.service;

import com.sirhc.demo.reactmapboxapi.account.domain.User;
import com.sirhc.demo.reactmapboxapi.account.repository.RoleRepository;
import com.sirhc.demo.reactmapboxapi.account.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>(roleRepository.findAll()));
        userRepository.save(user);
    }

    @Override
    public User createUser(String username, String password) {
        User user = new User(username, bCryptPasswordEncoder.encode(password));
        userRepository.save(user);

        return user;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("username " + username + " not found"));
    }
}