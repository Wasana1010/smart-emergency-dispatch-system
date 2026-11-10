package com.emergency.system.algorithm.priority;

import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Priority;
import java.util.Comparator;

public class EmergencyComparator implements Comparator<Emergency> {

    @Override
    public int compare(Emergency e1, Emergency e2) {
        // Higher priority should come first. We map priorities to weight values.
        int p1Weight = getPriorityWeight(e1.getPriority());
        int p2Weight = getPriorityWeight(e2.getPriority());

        if (p1Weight != p2Weight) {
            // Descending order of weight (Higher weight = higher priority)
            return Integer.compare(p2Weight, p1Weight);
        }

        // Secondary Rule: If priority is equal, older requests (earlier requestedAt) come first
        return e1.getRequestedAt().compareTo(e2.getRequestedAt());
    }

    private int getPriorityWeight(Priority priority) {
        if (priority == null) return 0;
        switch (priority) {
            case URGENT: return 4;
            case HIGH: return 3;
            case MEDIUM: return 2;
            case LOW: return 1;
            default: return 0;
        }
    }
}