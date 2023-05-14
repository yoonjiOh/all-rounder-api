import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { MulterOption } from '../multer/multer_option';
import * as XLSX from 'xlsx';

@Controller('upload')
export class FileUploadHttpController {
  private readonly logger = new Logger(FileUploadHttpController.name);

  constructor() {
    this.logger.log('FileUploadHttpController created');
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(0, file);
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    // 첫번째 sheet 의 이름을 조회합니다.
    const sheetName = workbook.SheetNames[0];
    const firstSheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
      defval: '',
      raw: false,
    });

    // database 에 raw data 를 저장합니다.
    // userId, companyId, mappingInfo, rawData, createdAt, updatedAt
    console.log(1, jsonData);
    return 'File uploaded';
  }
}
