import { RequestWithUser } from '@account-book/types'
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CardsService } from './cards.service'
import { CreateCardDto, UpdateCardDto } from './dto/card.dto'

@ApiTags('卡片管理')
@ApiBearerAuth()
@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  @ApiOperation({ summary: '创建卡片' })
  @ApiResponse({ status: 201, description: '成功创建卡片' })
  async create(@Body() createCardDto: CreateCardDto, @Request() req: RequestWithUser) {
    return this.cardsService.create(createCardDto, req.user.userId)
  }

  @Get()
  @ApiOperation({ summary: '获取所有卡片' })
  @ApiResponse({ status: 200, description: '成功获取卡片列表' })
  async findAll(@Request() req: RequestWithUser) {
    return this.cardsService.findAll(req.user.userId)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单张卡片详情' })
  @ApiResponse({ status: 200, description: '成功获取卡片' })
  async findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.cardsService.findOne(id, req.user.userId)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新卡片' })
  @ApiResponse({ status: 200, description: '成功更新卡片' })
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Request() req: RequestWithUser) {
    return this.cardsService.update(id, updateCardDto, req.user.userId)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除卡片' })
  @ApiResponse({ status: 200, description: '成功删除卡片' })
  async remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.cardsService.remove(id, req.user.userId)
  }
}
