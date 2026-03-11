import { RequestWithUser } from '@account-book/types'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard'
import { TagsService } from './tags.service'

export interface CreateTagDto {
  name: string
}

@ApiTags('tags')
@ApiBearerAuth()
@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: '获取当前用户的所有标签' })
  @ApiResponse({ status: 200, description: '返回标签列表' })
  async findAll(@Request() req: RequestWithUser) {
    return this.tagsService.findAllByUser(req.user.userId)
  }

  @Post()
  @ApiOperation({ summary: '创建标签' })
  @ApiResponse({ status: 201, description: '创建成功' })
  async create(
    @Body() createTagDto: CreateTagDto,
    @Request() req: RequestWithUser,
  ) {
    return this.tagsService.create(createTagDto.name, req.user.userId)
  }
}
