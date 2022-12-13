import { Controller, Get } from '@nestjs/common';

@Controller('application/status')
export class ApplicationStatusController {
  constructor() {}

  @Get()
  status(): Record<string, unknown> {
    return {
      available: true,
    };
  }
}
