import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from '../ormconfig'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { CardsModule } from './modules/cards/cards.module'
import { ImportRecordModule } from './modules/importrecord/import-record.module'
import { LedgersModule } from './modules/ledgers/ledgers.module'
import { StatisticsModule } from './modules/statistics/statistics.module'
import { TagsModule } from './modules/tags/tags.module'
import { TransactionsModule } from './modules/transactions/transactions.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
    }),
    AuthModule,
    UsersModule,
    TransactionsModule,
    ImportRecordModule,
    CardsModule,
    TagsModule,
    StatisticsModule,
    LedgersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
