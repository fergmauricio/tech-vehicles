import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { VehicleEvents } from './vehicle-events.enum';

@Injectable()
export class VehicleConsumerService {
  @RabbitSubscribe({
    exchange: 'vehicles.exchange',
    routingKey: VehicleEvents.CREATED,
    queue: 'vehicle_created_queue',
  })
  async handleVehicleCreated(message: any) {
    console.log('[VEHICLE-WORKER] Veículo criado: ', message);
  }

  @RabbitSubscribe({
    exchange: 'vehicles.exchange',
    routingKey: VehicleEvents.UPDATED,
    queue: 'vehicles_updated_queue',
  })
  async handleUpdated(msg: any) {
    console.log('[VEHICLE-WORKER] Veículo atualizado:', msg);
  }

  @RabbitSubscribe({
    exchange: 'vehicles.exchange',
    routingKey: VehicleEvents.DELETED,
    queue: 'vehicle_deleted_queue',
  })
  async handleDeleted(msg: any) {
    console.log('[VEHICLE-WORKER] Veículo excluído:', msg);
  }
}
