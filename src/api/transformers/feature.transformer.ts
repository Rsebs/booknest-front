import type { Feature } from '@/models/feature.model';
import type { ApiFeature } from '../types/feature.api';

export function transformFeature(feature: ApiFeature): Feature {
  return {
    id: feature.id,
    name: feature.name,
    icon: feature.icon,
    routeName: feature.route_name,
  };
}
