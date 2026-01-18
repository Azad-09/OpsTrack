package com.opstrack.config;

import com.opstrack.user.Role;
import com.opstrack.user.User;
import com.opstrack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("user@opstrack.com").isEmpty()){
            User user = User.builder()
                    .name("Normal User")
                    .email("user@opstrack.com")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.USER)
                    .active(true)
                    .build();

            userRepository.save(user);
        }
    }
}
