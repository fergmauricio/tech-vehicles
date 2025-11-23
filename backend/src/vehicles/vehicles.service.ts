import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";

import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import type { VehicleRepository } from "./repositories/vehicle.repository";

@Injectable()
export class VehiclesService {
  constructor(
    @Inject("VehicleRepository")
    private readonly repo: VehicleRepository,
  ) {}

  async create(dto: CreateVehicleDto) {
    if (await this.repo.existsByPlaca(dto.placa))
      throw new BadRequestException("Placa já cadastrada.");

    if (await this.repo.existsByRenavam(dto.renavam))
      throw new BadRequestException("RENAVAM já cadastrado.");

    if (await this.repo.existsByChassi(dto.chassi))
      throw new BadRequestException("Chassi já cadastrado.");

    return this.repo.create(dto);
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

    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    const ok = await this.repo.delete(id);
    if (!ok) throw new NotFoundException("Veículo não encontrado.");
    return { deleted: true };
  }
}
