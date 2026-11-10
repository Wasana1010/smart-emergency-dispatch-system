package com.emergency.system.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NotificationRequest {
    @NotNull
    private Long userId;
    
    private Long emergencyId; // Optional, tied to an incident if relevant
    
    @NotBlank
    private String title;
    
    @NotBlank
    private String message;
    
    @NotBlank
    private String notificationType;
}