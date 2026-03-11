import { RequestWithUser } from '@account-book/types'
import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { StatisticsService } from './statistics.service'

@ApiTags('statistics')
@ApiBearerAuth()
@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({ summary: '获取统计数据' })
  async getStatistics(
    @Request() req: RequestWithUser,
    @Query('month') month?: string,
    @Query('date') date?: string,
    @Query('type') type: 'year' | 'month' | 'day' | 'all' = 'month',
    @Query('ledgerId') ledgerId?: string,
  ) {
    const targetDate = date || month || new Date().toISOString()
    return this.statisticsService.getStatistics(req.user.userId, targetDate, type as any, ledgerId)
  }
}
