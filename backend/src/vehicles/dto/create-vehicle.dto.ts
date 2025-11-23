import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, Min, Max, Length } from "class-validator";

export class CreateVehicleDto {
  @ApiProperty({ example: "AAA1B23", description: "Placa do veículo" })
  @IsNotEmpty()
  @IsString()
  placa: string;

  @ApiProperty({ example: "9BWZZZ377VT004251", description: "Chassi do veículo" })
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  chassi: string;

  @ApiProperty({ example: "12345678901", description: "Renavam do veículo" })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  renavam: string;

  @ApiProperty({ example: "Civic", description: "Modelo do veículo" })
  @IsNotEmpty()
  @IsString()
  modelo: string;

  @ApiProperty({ example: "Honda", description: "Marca do veículo" })
  @IsNotEmpty()
  @IsString()
  marca: string;

  @ApiProperty({ example: 2020, description: "Ano de fabricação do veículo" })
  @IsInt()
  @Min(1900)
  @Max(2100)
  ano: number;
}
