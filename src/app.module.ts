import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        connectString: (() => {
          const host = configService.get<string>('DB_HOST');
          const port = configService.get<number>('DB_PORT');
          const sid = configService.get<string>('DB_SID');
          const serviceName = configService.get<string>('DB_SERVICE_NAME');
          if (serviceName) {
            return `${host}:${port}/${serviceName}`;
          }
          return `${host}:${port}/${sid}`;
        })(),
        entities: [User],
        synchronize: false,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}