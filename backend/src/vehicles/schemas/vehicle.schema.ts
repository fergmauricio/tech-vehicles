import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true, unique: true })
  placa: string;

  @Prop({ required: true, unique: true })
  chassi: string;

  @Prop({ required: true, unique: true })
  renavam: string;

  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  ano: number;
}

export type VehicleDocument = Vehicle & Document;
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
