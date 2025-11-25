import { CreateVehicleDto } from "../../dto/create-vehicle.dto";
import { UpdateVehicleDto } from "../../dto/update-vehicle.dto";

export const vehicleStub = () => ({
  _id: "507f1f77bcf86cd799439011",
  placa: "AAA2B27",
  chassi: "9BWZZZ377VT004266",
  renavam: "12149678957",
  modelo: "Civic",
  marca: "Honda",
  ano: 2020,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const createVehicleDtoStub = (): CreateVehicleDto => ({
  placa: "AAA2B27",
  chassi: "9BWZZZ377VT004266",
  renavam: "12149678957",
  modelo: "Civic",
  marca: "Honda",
  ano: 2020,
});

export const updateVehicleDtoStub = (): UpdateVehicleDto => ({
  modelo: "Civic Touring",
  ano: 2021,
});
