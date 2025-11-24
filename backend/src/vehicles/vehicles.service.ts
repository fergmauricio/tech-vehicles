import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";

import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import type { VehicleRepository } from "./repositories/vehicle.repository";

import { VehicleEvents } from "../../../shared/events/vehicle-events.enum";
import { VehicleEventsPublisher } from "./events/vehicle-event.publisher";

@Injectable()
export class VehiclesService {
  constructor(
    @Inject("VehicleRepository")
    private readonly repo: VehicleRepository,
    private readonly publisher: VehicleEventsPublisher,
  ) {}

  async create(dto: CreateVehicleDto) {
    if (await this.repo.existsByPlaca(dto.placa))
      throw new BadRequestException("Placa já cadastrada.");

    if (await this.repo.existsByRenavam(dto.renavam))
      throw new BadRequestException("RENAVAM já cadastrado.");

    if (await this.repo.existsByChassi(dto.chassi))
      throw new BadRequestException("Chassi já cadastrado.");

    const vehicle = await this.repo.create(dto);

    await this.publisher.publish(VehicleEvents.CREATED, vehicle);

    return vehicle;
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const vehicle = await this.repo.findById(id);
    if (!vehicle) throw new NotFoundException("Veículo não encontrado.");
    return vehicle;
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException("Veículo não encontrado.");

    const updated = await this.repo.update(id, dto);

    await this.publisher.publish(VehicleEvents.UPDATED, updated);

    return updated;
  }

  async remove(id: string) {
    const ok = await this.repo.delete(id);
    if (!ok) throw new NotFoundException("Veículo não encontrado.");

    await this.publisher.publish(VehicleEvents.DELETED, { id });

    return { deleted: true };
  }
}
