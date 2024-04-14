package com.coderscampus.AssignmentSubmissionApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderscampus.AssignmentSubmissionApp.domain.User;

public interface UserRepository extends JpaRepository<User,Long> {
    public Optional<User> findByUsername(String usernmae);
}
