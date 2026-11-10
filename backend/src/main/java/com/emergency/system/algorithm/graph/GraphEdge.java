package com.emergency.system.algorithm.graph;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraphEdge {
    private Long id;
    private Long startNodeId;
    private Long endNodeId;
    private double weight; // e.g., distance in km or estimated time in minutes
    private boolean isBlocked;
    private boolean isBidirectional;
}