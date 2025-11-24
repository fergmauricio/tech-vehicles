import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { VehicleEvents } from './events/vehicle-events.enum';
import { VehicleEventDTO } from './events/vehicle-event.dto';

@Injectable()
export class VehicleConsumerService {
  @RabbitSubscribe({
    exchange: 'vehicles.exchange',
    routingKey: VehicleEvents.CREATED,
    queue: 'vehicle_created_queue',
  })
  async handleVehicleCreated(message: VehicleEventDTO) {
    console.log('[VEHICLE-WORKER] Veículo criado:', message);
  }

  @RabbitSubscribe({
    exchange: 'vehicles.exchange',
    routingKey: VehicleEvents.UPDATED,
    queue: 'vehicle_updated_queue',
  })
  async handleUpdated(msg: VehicleEventDTO) {
    console.log('[VEHICLE-WORKER] Veículo atualizado:', msg);
  }

  @RabbitSubscribe({
    exchange: 'vehicles.exchange',
    routingKey: VehicleEvents.DELETED,
    queue: 'vehicle_deleted_queue',
  })
  async handleDeleted(msg: VehicleEventDTO) {
    console.log('[VEHICLE-WORKER] Veículo excluído:', msg);
  }
}
