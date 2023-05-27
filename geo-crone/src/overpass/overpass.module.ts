import { Module } from '@nestjs/common';
import { OverpassService } from './overpass.service';
import { ConvertModule } from '../convert/convert.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesEntity } from '../convert/entities/nodes.entity';
import { WaysEntity } from '../convert/entities/ways.entity';
import { OverpassController } from './overpass.controller';
import { WaysInfoEntity } from '../convert/entities/ways-info.entity';

@Module({
  providers: [OverpassService],
  imports: [TypeOrmModule.forFeature([NodesEntity]), ConvertModule],
  controllers: [OverpassController],
})
export class OverpassModule {}
