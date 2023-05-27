import { Injectable } from '@nestjs/common';
import { overpassJson, OverpassWay } from 'overpass-ts';
import { RequestNodes } from './requests/ways-and-nodes.request';
import { OverpassNode } from 'overpass-ts/dist/types';
import { ConvertService } from '../convert/convert.service';
import { InjectRepository } from '@nestjs/typeorm';
import { NodesEntity } from '../convert/entities/nodes.entity';
import { In, Repository } from 'typeorm';
import { WaysEntity } from '../convert/entities/ways.entity';
import { NodeDto } from '../common/dto/node.dto';
import { WayDto } from '../common/dto/way.dto';

@Injectable()
export class OverpassService {
  constructor(
    private readonly convertService: ConvertService,
    @InjectRepository(NodesEntity)
    private nodesRepo: Repository<NodesEntity>, // @InjectRepository(WaysEntity) // private waysRepo: Repository<WaysEntity>,
  ) {}
  async getNodesAndWay() {
    const res = await overpassJson(RequestNodes);

    const nodesAndWays: OverpassNode[] | OverpassWay[] = res.elements as
      | OverpassNode[]
      | OverpassWay[];

    const nodes: NodeDto[] = await this.convertService.getNodes(nodesAndWays);
    const ways: OverpassWay[] = await this.convertService.getWays(nodesAndWays);

    await this.convertService.adjacencyMatrix(ways[0].nodes);
    await this.convertService.getPath();
    await this.saveNodes(nodes);
    // await this.saveWays(ways);
  }

  generateChunk<T = NodeDto[] | WayDto[]>(data: T[], chunkSize = 40): T[][] {
    const chunkArr: T[][] = [];
    let tempArr: T[] = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const del = i + 1;

      if (del % chunkSize === 0) {
        tempArr.push(item);
        chunkArr.push(tempArr);
        tempArr = [];
        continue;
      }

      tempArr.push(item);

      if (i + 1 === data.length) {
        chunkArr.push(tempArr);
      }
    }

    return chunkArr;
  }

  async saveNodes(nodes: NodeDto[]): Promise<void> {
    const chunks = this.generateChunk<NodeDto>(nodes);
    for (const chunk of chunks) {
      await this.nodesRepo.upsert(chunk, ['id']);
    }
  }

  // async saveWays(ways: WayDto[]): Promise<void> {
  //   const chunks = this.generateChunk<WayDto>(ways);
  //   for (const chunk of chunks) {
  //     await this.waysRepo.save(chunk);
  //   }
  // }
}
