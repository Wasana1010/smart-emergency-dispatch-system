package com.emergency.system.dto;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserRequest {
    @NotBlank private String fullName;
    @Email @NotBlank private String email;
    @NotBlank private String password;
    private String nic;
    private String role;
}