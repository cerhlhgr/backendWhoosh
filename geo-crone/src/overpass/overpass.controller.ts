import { Controller, Get } from '@nestjs/common';
import { OverpassService } from './overpass.service';

@Controller('overpass')
export class OverpassController {
  constructor(private readonly overpassService: OverpassService) {}

  @Get()
  async get() {
    await this.overpassService.getNodesAndWay();
    return {};
  }
}
