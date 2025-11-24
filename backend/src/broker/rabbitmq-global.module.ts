import { Module, Global } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("RABBITMQ_URL") || "",
        exchanges: [
          {
            name: "vehicles.exchange",
            type: "topic",
          },
        ],
      }),
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQGlobalModule {}
