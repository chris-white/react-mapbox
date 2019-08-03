package com.sirhc.demo.account.domain;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "user")
public class User {

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    @Transient
    private String passwordConfirm;

    @ManyToMany
    private Set<Role> roles;

}