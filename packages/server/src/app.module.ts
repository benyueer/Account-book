import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './domain/user/user.module';
import { User } from './domain/user/entity/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserService } from './domain/user/user.service';
import { AuthModule } from './domain/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysqlhost'),
        port: +configService.get('mysqlport'),
        username: configService.get('mysqluser'),
        password: configService.get('mysqlpwd'),
        database: configService.get('database'),
        synchronize: true,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.graphql',
      cors: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [UserService],
})
export class AppModule {}
