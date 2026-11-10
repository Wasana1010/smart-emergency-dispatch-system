package com.emergency.system.algorithm.graph;

import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class RoadGraph {
    // Adjacency list: NodeId -> List of outgoing edges
    private final Map<Long, List<GraphEdge>> adjacencyList = new HashMap<>();
    private final Map<Long, GraphNode> nodes = new HashMap<>();
    private final Map<Long, GraphEdge> edges = new HashMap<>(); // EdgeId -> Edge reference for fast updates

    // Add a node to the graph
    public void addNode(GraphNode node) {
        nodes.put(node.getId(), node);
        adjacencyList.putIfAbsent(node.getId(), new ArrayList<>());
    }

    // Add an edge (and handle bidirectionality)
    public void addEdge(GraphEdge edge) {
        edges.put(edge.getId(), edge);
        adjacencyList.putIfAbsent(edge.getStartNodeId(), new ArrayList<>());
        adjacencyList.get(edge.getStartNodeId()).add(edge);

        // If bidirectional, register a mirrored logical connection or handle it during neighbor lookup
        if (edge.isBidirectional()) {
            GraphEdge reverseEdge = new GraphEdge(
                edge.getId(), 
                edge.getEndNodeId(), 
                edge.getStartNodeId(), 
                edge.getWeight(), 
                edge.isBlocked(), 
                true
            );
            adjacencyList.putIfAbsent(edge.getEndNodeId(), new ArrayList<>());
            adjacencyList.get(edge.getEndNodeId()).add(reverseEdge);
        }
    }

    // Remove an edge
    public void removeEdge(Long edgeId) {
        GraphEdge edge = edges.remove(edgeId);
        if (edge != null) {
            removeEdgeFromList(edge.getStartNodeId(), edgeId);
            if (edge.isBidirectional()) {
                removeEdgeFromList(edge.getEndNodeId(), edgeId);
            }
        }
    }

    private void removeEdgeFromList(Long nodeId, Long edgeId) {
        List<GraphEdge> list = adjacencyList.get(nodeId);
        if (list != null) {
            list.removeIf(e -> e.getId().equals(edgeId));
        }
    }

    // Update edge weight (e.g., due to heavy traffic or recalculation)
    public void updateEdgeWeight(Long edgeId, double newWeight) {
        GraphEdge edge = edges.get(edgeId);
        if (edge != null) {
            edge.setWeight(newWeight);
            // Sync inside adjacency lists
            syncEdgeProperty(edgeId);
        }
    }

    // Block a road segment dynamically without deleting it from DB
    public void blockRoad(Long edgeId) {
        GraphEdge edge = edges.get(edgeId);
        if (edge != null) {
            edge.setBlocked(true);
            syncEdgeProperty(edgeId);
        }
    }

    // Unblock a road segment
    public void unblockRoad(Long edgeId) {
        GraphEdge edge = edges.get(edgeId);
        if (edge != null) {
            edge.setBlocked(false);
            syncEdgeProperty(edgeId);
        }
    }

    private void syncEdgeProperty(Long edgeId) {
        for (List<GraphEdge> list : adjacencyList.values()) {
            for (GraphEdge e : list) {
                if (e.getId().equals(edgeId)) {
                    GraphEdge master = edges.get(edgeId);
                    e.setWeight(master.getWeight());
                    e.setBlocked(master.isBlocked());
                }
            }
        }
    }

    // Get active (unblocked) neighbors for pathfinding algorithms (Dijkstra / A*)
    public List<GraphEdge> getNeighbors(Long nodeId) {
        List<GraphEdge> edgesList = adjacencyList.get(nodeId);
        if (edgesList == null) return Collections.emptyList();
        
        List<GraphEdge> activeNeighbors = new ArrayList<>();
        for (GraphEdge edge : edgesList) {
            if (!edge.isBlocked()) {
                activeNeighbors.add(edge);
            }
        }
        return activeNeighbors;
    }

    public GraphNode getNode(Long nodeId) {
        return nodes.get(nodeId);
    }
}