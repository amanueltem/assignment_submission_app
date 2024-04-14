package com.coderscampus.AssignmentSubmissionApp;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTest {
    @Test
    public void encode_password(){
        PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        System.out.println("\n\n\n*************************************");
        System.out.println(passwordEncoder.encode("asdfasdf"));
        System.out.println(passwordEncoder.matches("asdfasdf", "$2a$10$A3cN9UrC0YrgKmCFYboVm.c.5dAZm5VK4tJpSPLsypZ2PHmwZ3oha"));
    }
}
