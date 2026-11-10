package com.emergency.system.dto;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class HospitalRequest {
    @NotBlank private String name;
    private String address;
    @NotNull private Double latitude;
    @NotNull private Double longitude;
    @Min(0) private Integer emergencyCapacity;
    @Min(0) private Integer icuCapacity;
}