package com.emergency.system.service;

import com.emergency.system.dto.RoadEdgeRequest;
import com.emergency.system.entity.*;
import com.emergency.system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoadNetworkService {
    @Autowired private RoadNodeRepository nodeRepo;
    @Autowired private RoadEdgeRepository edgeRepo;

    public RoadEdge createEdge(RoadEdgeRequest req) {
        RoadNode start = nodeRepo.findById(req.getStartNodeId())
            .orElseThrow(() -> new RuntimeException("Start node not found"));
        RoadNode end = nodeRepo.findById(req.getEndNodeId())
            .orElseThrow(() -> new RuntimeException("End node not found"));

        RoadEdge edge = new RoadEdge();
        edge.setStartNode(start);
        edge.setEndNode(end);
        edge.setDistanceKm(req.getDistanceKm());
        edge.setEstimatedTimeMinutes(req.getEstimatedTimeMinutes());
        edge.setIsBidirectional(req.getIsBidirectional());
        return edgeRepo.save(edge);
    }
}