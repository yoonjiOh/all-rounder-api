import { BadRequestException } from '@nestjs/common';

export const MulterOption = {
  // excel file type 이 아니면 reject
  fileFilter: (request, file, callback) => {
    if (file.fieldname === 'excel') {
      callback(null, file);
    } else {
      callback(new BadRequestException('지원하지 않는 형식 입니다.'), null);
    }
  },
  // TODO: 추후 리밋 변경
  limits: { fileSize: 3000000000 },
};
