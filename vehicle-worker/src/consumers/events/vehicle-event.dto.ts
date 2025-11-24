import { VehicleEvents } from './vehicle-events.enum';

export class VehicleEventDTO<data = any> {
  metadata: {
    event: VehicleEvents;
    timestamp: string;
  };

  data;
}
