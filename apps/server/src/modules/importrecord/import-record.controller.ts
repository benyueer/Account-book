import { Buffer } from 'node:buffer'
import { extname } from 'node:path'
import { RequestWithUser } from '@account-book/types'
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { diskStorage } from 'multer'
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '账单文件(csv/xlsx)',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`)
      },
    }),
  }))
  @ApiResponse({ status: 201, description: '上传成功，后台处理中' })
  async upload(
    @Request() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // 解决 multer 中文文件名乱码问题 (latin1 -> utf8)
    const originalName = file?.originalname
      ? Buffer.from(file.originalname, 'latin1').toString('utf8')
      : 'unknown'

    return this.service.upload(
      req.user.userId,
      originalName,
      file?.mimetype || 'application/octet-stream',
      file?.path,
    )
  }
}
