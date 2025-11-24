import { Module } from '@nestjs/common';

import { VehicleConsumerService } from './vehicle-consumer.service';

@Module({
  providers: [VehicleConsumerService],
})
export class VehicleConsumerModule {}
