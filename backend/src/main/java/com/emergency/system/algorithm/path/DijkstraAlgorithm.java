package com.emergency.system.algorithm.path;

import com.emergency.system.algorithm.graph.GraphEdge;
import com.emergency.system.algorithm.graph.RoadGraph;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DijkstraAlgorithm {

    // Helper class to store node traversal state in the priority queue
    private static class NodeDistance implements Comparable<NodeDistance> {
        Long nodeId;
        double cost;

        public NodeDistance(Long nodeId, double cost) {
            this.nodeId = nodeId;
            this.cost = cost;
        }

        @Override
        public int compareTo(NodeDistance other) {
            return Double.compare(this.cost, other.cost);
        }
    }

    public PathResult findShortestPath(RoadGraph graph, Long startNodeId, Long targetNodeId) {
        if (graph.getNode(startNodeId) == null || graph.getNode(targetNodeId) == null) {
            return new PathResult(Collections.emptyList(), -1.0, false);
        }

        // Keep track of shortest known distance from start to each node
        Map<Long, Double> distances = new HashMap<>();
        // Keep track of previous nodes to reconstruct the path later
        Map<Long, Long> previousNodes = new HashMap<>();
        // Priority queue acting as a min-heap, ordered by accumulated cost
        PriorityQueue<NodeDistance> pq = new PriorityQueue<>();

        distances.put(startNodeId, 0.0);
        pq.offer(new NodeDistance(startNodeId, 0.0));

        Set<Long> visited = new HashSet<>();

        while (!pq.isEmpty()) {
            NodeDistance current = pq.poll();
            Long currentNodeId = current.nodeId;

            // If we reached the target, we can stop early
            if (currentNodeId.equals(targetNodeId)) {
                break;
            }

            if (visited.contains(currentNodeId)) {
                continue;
            }
            visited.add(currentNodeId);

            // Explore active neighbors (ignoring blocked roads)
            for (GraphEdge edge : graph.getNeighbors(currentNodeId)) {
                Long neighborId = edge.getEndNodeId();

                if (visited.contains(neighborId)) {
                    continue;
                }

                double newCost = distances.get(currentNodeId) + edge.getWeight();

                if (newCost < distances.getOrDefault(neighborId, Double.MAX_VALUE)) {
                    distances.put(neighborId, newCost);
                    previousNodes.put(neighborId, currentNodeId);
                    pq.offer(new NodeDistance(neighborId, newCost));
                }
            }
        }

        // Check if destination was reached
        if (!distances.containsKey(targetNodeId) || distances.get(targetNodeId) == Double.MAX_VALUE) {
            return new PathResult(Collections.emptyList(), -1.0, false);
        }

        // Reconstruct path backwards from target to start
        LinkedList<Long> path = new LinkedList<>();
        Long curr = targetNodeId;
        while (curr != null) {
            path.addFirst(curr);
            curr = previousNodes.get(curr);
        }

        return new PathResult(path, distances.get(targetNodeId), true);
    }
}