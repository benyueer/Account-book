import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Transaction } from './entities/transaction.entity'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { PaginationDto } from '../../common/dto/pagination.dto'

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get()
  @ApiOperation({ summary: '获取交易记录列表' })
  @ApiResponse({ status: 200, description: '返回分页的交易记录' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  async findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (page < 1) {
      throw new BadRequestException('页码必须大于0')
    }
    if (limit < 1 || limit > 100) {
      throw new BadRequestException('每页数量必须在1-100之间')
    }

    const filters: { startDate?: Date; endDate?: Date } = {}
    
    if (startDate) {
      const date = new Date(startDate)
      if (isNaN(date.getTime())) {
        throw new BadRequestException('开始日期格式不正确')
      }
      filters.startDate = date
    }
    
    if (endDate) {
      const date = new Date(endDate)
      if (isNaN(date.getTime())) {
        throw new BadRequestException('结束日期格式不正确')
      }
      filters.endDate = date
    }

    return this.service.findAll(
      req.user.userId,
      { page, limit },
      filters,
    )
  }

  @Post()
  @ApiOperation({ summary: '创建交易记录' })
  @ApiResponse({ status: 201, description: '交易记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 401, description: '未授权' })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
  ) {
    return this.service.create(createTransactionDto, req.user.userId)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个交易记录' })
  @ApiResponse({ status: 200, description: '返回交易记录详情' })
  @ApiResponse({ status: 404, description: '交易记录不存在' })
  @ApiResponse({ status: 401, description: '未授权' })
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.service.findOneById(id, req.user.userId)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新交易记录' })
  @ApiResponse({ status: 200, description: '交易记录更新成功' })
  @ApiResponse({ status: 404, description: '交易记录不存在' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 401, description: '未授权' })
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req,
  ) {
    return this.service.update(id, updateTransactionDto, req.user.userId)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除交易记录' })
  @ApiResponse({ status: 200, description: '交易记录删除成功' })
  @ApiResponse({ status: 404, description: '交易记录不存在' })
  @ApiResponse({ status: 401, description: '未授权' })
  async remove(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.service.remove(id, req.user.userId)
  }
}
