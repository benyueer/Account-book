import type { RequestWithUser } from '@account-book/types'
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ImportRecordService } from './import-record.service'

@ApiTags('import-record')
@ApiBearerAuth()
@Controller('import-record')
@UseGuards(JwtAuthGuard)
export class ImportRecordController {
  constructor(private readonly service: ImportRecordService) { }

  @Get()
  @ApiOperation({ summary: '获取导入记录列表' })
  @ApiResponse({ status: 200, description: '返回分页的导入记录' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Request() req: RequestWithUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.service.findAll(req.user.userId, page, limit)
  }

  @Post('upload')
  @ApiOperation({ summary: '上传账单文件' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 201, description: '上传成功，后台处理中' })
  async upload(
    @Request() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // 这里使用模拟逻辑，不保存真实文件
    return this.service.uploadSimulated(
      req.user.userId,
      file?.originalname || 'unknown',
      file?.mimetype || 'application/octet-stream',
    )
  }
}
