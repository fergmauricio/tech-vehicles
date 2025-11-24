import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { VehiclesModule } from "./vehicles/vehicles.module";
import { HealthModule } from "./health/health.module";
import { MessagingModule } from "./messaging/messaging.module";
import { RabbitMQGlobalModule } from "./broker/rabbitmq-global.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
    }),
    RabbitMQGlobalModule,
    DatabaseModule,
    VehiclesModule,
    HealthModule,
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
