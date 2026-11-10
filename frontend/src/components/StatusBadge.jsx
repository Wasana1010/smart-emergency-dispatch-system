import React from 'react';
import { Badge } from './Badge';

export const StatusBadge = ({ status }) => {
  const normalized = status ? status.toUpperCase() : '';

  switch (normalized) {
    case 'CRITICAL':
    case 'EMERGENCY':
    case 'DISPATCHED':
      return <Badge variant="red">{normalized}</Badge>;
    case 'HIGH':
    case 'EN_ROUTE':
    case 'BUSY':
      return <Badge variant="yellow">{normalized}</Badge>;
    case 'MEDIUM':
    case 'ARRIVED':
    case 'AVAILABLE':
      return <Badge variant="blue">{normalized}</Badge>;
    case 'LOW':
    case 'COMPLETED':
    case 'RESOLVED':
      return <Badge variant="green">{normalized}</Badge>;
    default:
      return <Badge variant="gray">{normalized || 'UNKNOWN'}</Badge>;
  }
};