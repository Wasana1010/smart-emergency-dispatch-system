package com.emergency.system.service;

import com.emergency.system.algorithm.graph.GraphEdge;
import com.emergency.system.algorithm.graph.GraphNode;
import com.emergency.system.algorithm.graph.RoadGraph;
import com.emergency.system.algorithm.path.DijkstraAlgorithm;
import com.emergency.system.algorithm.path.PathResult;
import com.emergency.system.entity.EdgeStatus;
import com.emergency.system.repository.RoadEdgeRepository;
import com.emergency.system.repository.RoadNodeRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RoadNodeRepository nodeRepository;

    @Autowired
    private RoadEdgeRepository edgeRepository;

    @Autowired
    private DijkstraAlgorithm dijkstraAlgorithm;

    @Autowired
    private RoadGraph roadGraph;

    // Load database network into in-memory graph upon application startup
    @PostConstruct
    public void loadGraphFromDatabase() {
        List<com.emergency.system.entity.RoadNode> dbNodes = nodeRepository.findAll();
        for (com.emergency.system.entity.RoadNode n : dbNodes) {
            roadGraph.addNode(new GraphNode(n.getId(), n.getName(), n.getLatitude(), n.getLongitude()));
        }

        List<com.emergency.system.entity.RoadEdge> dbEdges = edgeRepository.findAll();
        for (com.emergency.system.entity.RoadEdge e : dbEdges) {
            GraphEdge edge = new GraphEdge(
                e.getId(),
                e.getStartNode().getId(),
                e.getEndNode().getId(),
                e.getDistanceKm(),
                e.getStatus() == EdgeStatus.BLOCKED,
                e.getIsBidirectional()
            );
            roadGraph.addEdge(edge);
        }
    }

    public PathResult calculateShortestRoute(Long startNodeId, Long targetNodeId) {
        return dijkstraAlgorithm.findShortestPath(roadGraph, startNodeId, targetNodeId);
    }
}