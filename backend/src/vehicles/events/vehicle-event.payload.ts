import { VehicleEvents } from "../../../../shared/events/vehicle-events.enum";

export interface VehicleEventPayload<data = any> {
  metadata: {
    event: VehicleEvents;
    timestamp: string;
  };
  data;
}
