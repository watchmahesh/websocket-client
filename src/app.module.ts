/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceService } from './balance/balance.service';
import { BalanceController } from './balance/balance.controller';
// import { RedisModule } from './redis.module';

@Module({
  // imports: [RedisModule],
  controllers: [AppController,BalanceController],
  providers: [AppService,BalanceService],
})
export class AppModule {}
