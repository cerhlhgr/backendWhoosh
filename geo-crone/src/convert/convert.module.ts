import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdjacencyMatrixEntity } from './entities/adjacency-matrix.entity';

@Module({
  providers: [ConvertService],
  imports: [TypeOrmModule.forFeature([AdjacencyMatrixEntity])],
  exports: [ConvertService],
})
export class ConvertModule {}
