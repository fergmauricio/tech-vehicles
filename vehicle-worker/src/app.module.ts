import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehicleConsumerModule } from './consumers/vehicle-consumer.module';
import { RabbitMQGlobalModule } from './broker/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
    }),
    RabbitMQGlobalModule,
    VehicleConsumerModule,
  ],
})
export class AppModule {}
