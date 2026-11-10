package com.emergency.system.algorithm.path;

import com.emergency.system.algorithm.graph.GraphEdge;
import com.emergency.system.algorithm.graph.GraphNode;
import com.emergency.system.algorithm.graph.RoadGraph;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DijkstraAlgorithmTest {

    @Test
    void testShortestPathCalculation() {
        RoadGraph graph = new RoadGraph();

        graph.addNode(new GraphNode(1L, "A", 0.0, 0.0));
        graph.addNode(new GraphNode(2L, "B", 0.0, 0.0));
        graph.addNode(new GraphNode(3L, "C", 0.0, 0.0));

        // Edge A -> B (weight 2.0)
        graph.addEdge(new GraphEdge(101L, 1L, 2L, 2.0, false, true));
        // Edge B -> C (weight 3.0)
        graph.addEdge(new GraphEdge(102L, 2L, 3L, 3.0, false, true));
        // Edge A -> C direct (weight 10.0)
        graph.addEdge(new GraphEdge(103L, 1L, 3L, 10.0, false, true));

        DijkstraAlgorithm dijkstra = new DijkstraAlgorithm();
        PathResult result = dijkstra.findShortestPath(graph, 1L, 3L);

        assertTrue(result.isReachable());
        assertEquals(5.0, result.getTotalCost()); // Should choose A -> B -> C (2 + 3 = 5)
        assertEquals(3, result.getPathNodeIds().size());
    }

    @Test
    void testBlockedRoadIgnored() {
        RoadGraph graph = new RoadGraph();

        graph.addNode(new GraphNode(1L, "A", 0.0, 0.0));
        graph.addNode(new GraphNode(2L, "B", 0.0, 0.0));
        graph.addNode(new GraphNode(3L, "C", 0.0, 0.0));

        // Edge A -> B is blocked
        GraphEdge blockedEdge = new GraphEdge(101L, 1L, 2L, 2.0, true, true);
        graph.addEdge(blockedEdge);
        graph.addEdge(new GraphEdge(102L, 2L, 3L, 3.0, false, true));
        graph.addEdge(new GraphEdge(103L, 1L, 3L, 10.0, false, true)); // Alternative direct route

        DijkstraAlgorithm dijkstra = new DijkstraAlgorithm();
        PathResult result = dijkstra.findShortestPath(graph, 1L, 3L);

        assertTrue(result.isReachable());
        assertEquals(10.0, result.getTotalCost()); // Forced to take direct route due to blockage
    }
}