package com.emergency.system.repository;

import com.emergency.system.entity.EmergencyAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyAssignmentRepository extends JpaRepository<EmergencyAssignment, Long> {
}
