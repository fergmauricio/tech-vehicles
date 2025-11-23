import { Controller, Post, Get, Put, Delete, Body, Param } from "@nestjs/common";

import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: "Criar um novo veículo" })
  @ApiResponse({ status: 201, description: "Veículo criado com sucesso." })
  @ApiResponse({ status: 400, description: "Dados inválidos ou duplicidade." })
  create(@Body() dto: CreateVehicleDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os veículos" })
  @ApiResponse({ status: 200, description: "Lista de veículos retornada." })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar veículo por ID" })
  @ApiResponse({ status: 200, description: "Veículo encontrado." })
  @ApiResponse({ status: 404, description: "Veículo não encontrado." })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar um veículo" })
  @ApiResponse({ status: 200, description: "Veículo atualizado com sucesso." })
  @ApiResponse({ status: 404, description: "Veículo não encontrado." })
  update(@Param("id") id: string, @Body() dto: UpdateVehicleDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover um veículo" })
  @ApiResponse({ status: 200, description: "Veículo removido." })
  @ApiResponse({ status: 404, description: "Veículo não encontrado." })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
