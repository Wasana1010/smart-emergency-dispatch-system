package com.emergency.system.service;

import com.emergency.system.dto.UserRequest;
import com.emergency.system.dto.UserResponse;
import com.emergency.system.entity.User;
import com.emergency.system.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_shouldHashPasswordBeforeSaving() {
        UserRequest request = new UserRequest();
        request.setFullName("Alice Smith");
        request.setEmail("alice@example.com");
        request.setPassword("secret123");
        request.setRole("USER");

        ReflectionTestUtils.setField(userService, "passwordEncoder", new BCryptPasswordEncoder());

        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            assertNotEquals("secret123", user.getPassword());
            assertTrue(new BCryptPasswordEncoder().matches("secret123", user.getPassword()));
            return user;
        });

        UserResponse response = userService.createUser(request);

        assertEquals("Alice Smith", response.getFullName());
        assertEquals("alice@example.com", response.getEmail());
        assertEquals("USER", response.getRole());
    }
}
