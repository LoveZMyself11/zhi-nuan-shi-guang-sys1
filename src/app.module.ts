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
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const sid = configService.get<string>('DB_SID');
        const serviceName = configService.get<string>('DB_SERVICE_NAME');
        const connectString = serviceName
          ? `${host}:${port}/${serviceName}`
          : `${host}:${port}/${sid}`;

        return {
          type: 'oracle' as const,
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          connectString: connectString,
          entities: [User],
          synchronize: false,
          logging: process.env.NODE_ENV === 'development',
        };
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
