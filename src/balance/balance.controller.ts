/* eslint-disable prettier/prettier */
import { Query, Controller, Res, Get } from "@nestjs/common";
import { BalanceService } from './balance.service';
import { Response } from 'express';

@Controller('')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) { }

    @Get('get-balance')
    async getBalance(@Query() dto: any, @Res() res: Response): Promise<any> {
        const { userId } = dto;
       const balance = await this.balanceService.requestUserBalance(userId);
       res.json({ balance });
    }
}
