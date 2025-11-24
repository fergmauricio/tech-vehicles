import { Injectable } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

import { VehicleEventPayload } from "./vehicle-event.payload";
import { VehicleEvents } from "./vehicle-events.enum";

@Injectable()
export class VehicleEventsPublisher {
  constructor(private readonly amqp: AmqpConnection) {}

  async publish(event: VehicleEvents, data: any) {
    const payload: VehicleEventPayload = {
      metadata: {
        event,
        timestamp: new Date().toISOString(),
      },
      data,
    };

    await this.amqp.publish("vehicles.exchange", event, payload);
  }
}
