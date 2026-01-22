import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CrudRequestInterceptor } from '@nestjsx/crud'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { Transaction } from './entities/transaction.entity'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
  ],
  providers: [
    TransactionsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CrudRequestInterceptor,
    },
  ],
  controllers: [TransactionsController],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}
