import {
  Body,
  Controller,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { UpdateRawLedgerDto } from '../dto/request/update-raw-ledger.request.dto';
import { RawLedgerCommandService } from './raw-ledger.command.service';

@Controller('raw-ledger')
export class RawLedgerCommandHttpController {
  private readonly logger = new Logger(RawLedgerCommandHttpController.name);

  constructor(
    @Inject('RAW_LEDGER_COMMAND_SERVICE')
    private readonly rawLedgerCommandService: RawLedgerCommandService,
  ) {
    this.logger.log('RawLedgerHttpController created');
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

    const props = {
      userId: 'userId',
      companyId: 'companyId',
      rawData: jsonData,
    };

    await this.rawLedgerCommandService.createRawLedger(props);
    this.logger.debug('raw ledger created ', props);
    return 'File uploaded';
  }

  @Patch('/:id')
  async patchRawLedger(
    @Param('id') id: string,
    @Body() updateRawLedgerDto: UpdateRawLedgerDto,
  ) {
    await this.rawLedgerCommandService.updateRawLedger(id, updateRawLedgerDto);
  }
}
