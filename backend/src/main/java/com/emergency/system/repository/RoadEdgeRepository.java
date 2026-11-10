package com.emergency.system.repository;
import com.emergency.system.entity.RoadEdge;
import com.emergency.system.entity.EdgeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadEdgeRepository extends JpaRepository<RoadEdge, Long> {
    List<RoadEdge> findByStatus(EdgeStatus status);
}