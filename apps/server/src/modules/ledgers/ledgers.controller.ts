import { AddLedgerTransactionsDto, CreateLedgerDto, QuickAddLedgerTransactionsDto, RequestWithUser, UpdateLedgerDto } from '@account-book/types'
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { LedgersService } from './ledgers.service'

@ApiTags('ledgers')
@ApiBearerAuth()
@Controller('ledgers')
@UseGuards(JwtAuthGuard)
export class LedgersController {
  constructor(private readonly ledgersService: LedgersService) { }

  @Post()
  @ApiOperation({ summary: '创建账本' })
  async create(@Request() req: RequestWithUser, @Body() createLedgerDto: CreateLedgerDto) {
    return this.ledgersService.create(req.user.userId, createLedgerDto)
  }

  @Get()
  @ApiOperation({ summary: '获取所有账本' })
  async findAll(@Request() req: RequestWithUser) {
    return this.ledgersService.findAll(req.user.userId)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取账本详情' })
  async findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.ledgersService.findOne(req.user.userId, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新账本' })
  async update(@Request() req: RequestWithUser, @Param('id') id: string, @Body() updateLedgerDto: UpdateLedgerDto) {
    return this.ledgersService.update(req.user.userId, id, updateLedgerDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除账本' })
  async remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.ledgersService.remove(req.user.userId, id)
  }

  @Post(':id/transactions')
  @ApiOperation({ summary: '向账本添加交易记录' })
  async addTransactions(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() addDto: AddLedgerTransactionsDto,
  ) {
    return this.ledgersService.addTransactions(req.user.userId, id, addDto.transactionIds)
  }

  @Post(':id/quick-add')
  @ApiOperation({ summary: '快速向账本添加记录' })
  async quickAdd(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() quickAddDto: QuickAddLedgerTransactionsDto,
  ) {
    return this.ledgersService.quickAdd(req.user.userId, id, quickAddDto)
  }

  @Get(':id/transactions')
  @ApiOperation({ summary: '获取账本下的所有交易记录' })
  async getTransactions(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.ledgersService.getTransactions(req.user.userId, id)
  }

  @Delete(':id/transactions')
  @ApiOperation({ summary: '从账本移除交易记录' })
  async removeTransactions(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() removeDto: AddLedgerTransactionsDto,
  ) {
    return this.ledgersService.removeTransactions(req.user.userId, id, removeDto.transactionIds)
  }
}
