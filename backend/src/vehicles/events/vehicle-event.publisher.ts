import { Injectable } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

import { VehicleEvents } from "./vehicle-events.enum";
import { VehicleEventDTO } from "./dto/vehicle-event.dto";

@Injectable()
export class VehicleEventsPublisher {
  constructor(private readonly amqp: AmqpConnection) {}

  async publish(event: VehicleEvents, data: any) {
    const payload: VehicleEventDTO = {
      metadata: {
        event,
        timestamp: new Date().toISOString(),
      },
      data,
    };

    await this.amqp.publish("vehicles.exchange", event, payload);
  }
}
