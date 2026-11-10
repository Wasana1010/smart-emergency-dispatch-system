package com.emergency.system.algorithm.path;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathResult {
    private List<Long> pathNodeIds; // Ordered sequence of node IDs from start to destination
    private double totalCost;     // Total distance in km or time in minutes
    private boolean reachable;    // True if a valid path was found
}