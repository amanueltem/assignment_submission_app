package com.coderscampus.AssignmentSubmissionApp.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate cohortStartDate;
    private String username;
    private String name;
    @JsonIgnore
    private String password;
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER  ,mappedBy = "user")
    private List<Authority> authorities=new ArrayList<>();
    // geters
    public long getId() {
        return id;
    }

    public LocalDate getCohortStartDate() {
        return cohortStartDate;
    }
    @Override
    public String getUsername() {
        return username;
    }
     @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return authorities;
    }
    @Override
    public boolean isAccountNonExpired(){
        return true;
    }
    @Override
    public boolean isAccountNonLocked(){
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }
    @Override
    public boolean isEnabled(){
        return true;
    }

    // seters

    public void setId(Long id) {
        this.id = id;
    }

    public void setCohortStartDate(LocalDate cohortStartDate) {
        this.cohortStartDate = cohortStartDate;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public void setAuthorities(List<Authority> authorities){
        this.authorities=authorities;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getName(){
        return name;
    }
}
