import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclesController } from "./vehicles.controller";
import { VehiclesService } from "./vehicles.service";

import { Vehicle, VehicleSchema } from "./schemas/vehicle.schema";
import { VehicleMongoRepository } from "./repositories/vehicle-mongo.repository";
import { VehicleEventsPublisher } from "./events/vehicle-event.publisher";

@Module({
  imports: [MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])],
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    VehicleEventsPublisher,
    {
      provide: "VehicleRepository",
      useClass: VehicleMongoRepository,
    },
  ],
  exports: ["VehicleRepository"],
})
export class VehiclesModule {}
