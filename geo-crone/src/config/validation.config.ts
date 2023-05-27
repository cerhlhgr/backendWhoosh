import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export const validationConfig: ValidationPipeOptions = {
  whitelist: true,
};
