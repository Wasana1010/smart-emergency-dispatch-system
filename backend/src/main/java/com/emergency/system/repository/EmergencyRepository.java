package com.emergency.system.repository;

import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.EmergencyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmergencyRepository extends JpaRepository<Emergency, Long> {
    List<Emergency> findByStatus(EmergencyStatus status);
}
