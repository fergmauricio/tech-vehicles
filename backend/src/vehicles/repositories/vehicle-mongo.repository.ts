import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Vehicle, VehicleDocument } from "../schemas/vehicle.schema";
import { VehicleRepository } from "./vehicle.repository";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../dto/update-vehicle.dto";

@Injectable()
export class VehicleMongoRepository implements VehicleRepository {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(data: CreateVehicleDto): Promise<VehicleDocument> {
    const created = new this.vehicleModel(data);
    return created.save();
  }

  async findAll(): Promise<VehicleDocument[]> {
    return this.vehicleModel.find().exec();
  }

  async findById(id: string): Promise<VehicleDocument | null> {
    return this.vehicleModel.findById(id).exec();
  }

  async update(id: string, data: UpdateVehicleDto): Promise<VehicleDocument | null> {
    return this.vehicleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.vehicleModel.findByIdAndDelete(id).exec();
    return res !== null;
  }

  async existsByPlaca(placa: string): Promise<boolean> {
    return (await this.vehicleModel.exists({ placa })) !== null;
  }

  async existsByRenavam(renavam: string): Promise<boolean> {
    return (await this.vehicleModel.exists({ renavam })) !== null;
  }

  async existsByChassi(chassi: string): Promise<boolean> {
    return (await this.vehicleModel.exists({ chassi })) !== null;
  }
}
