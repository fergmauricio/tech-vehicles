import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";
import { VehicleDocument } from "../schemas/vehicle.schema";

export interface VehicleRepository {
  create(data: CreateVehicleDto): Promise<VehicleDocument>;
  findAll(): Promise<VehicleDocument[]>;
  findById(id: string): Promise<VehicleDocument | null>;
  update(id: string, data: UpdateVehicleDto): Promise<VehicleDocument | null>;
  delete(id: string): Promise<boolean>;
  existsByPlaca(placa: string): Promise<boolean>;
  existsByRenavam(renavam: string): Promise<boolean>;
  existsByChassi(chassi: string): Promise<boolean>;
}
