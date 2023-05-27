import { Injectable } from '@nestjs/common';
import { OverpassNode } from 'overpass-ts/dist/types';
import { OverpassWay } from 'overpass-ts';
import { typeEnum } from '../common/types';
import { NodeDto } from '../common/dto/node.dto';
import { plainToInstance } from 'class-transformer';
import * as geolib from 'geolib';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdjacencyMatrixEntity } from './entities/adjacency-matrix.entity';
@Injectable()
export class ConvertService {
  constructor(
    @InjectRepository(AdjacencyMatrixEntity)
    private adjacencyMatrixRepo: Repository<AdjacencyMatrixEntity>,
  ) {}
  async getNodes(items: OverpassNode[] | OverpassWay[]): Promise<NodeDto[]> {
    const nodes: NodeDto[] = [];

    for (const item of items) {
      if (item.type === typeEnum.Node) {
        const node = plainToInstance(NodeDto, {
          id: item.id,
          coordinate: `(${item.lat}, ${item.lon})`,
          payload: item.tags,
        });
        nodes.push(node);
      }
    }

    return nodes;
  }

  async getWays(items: OverpassNode[] | OverpassWay[]): Promise<OverpassWay[]> {
    const ways: OverpassWay[] = [];

    for (const item of items) {
      if (item.type === typeEnum.Way) {
        // for (const node of item.nodes) {
        //   const way = plainToInstance(WayDto, {
        //     nodeId: node,
        //     wayId: item.id,
        //   });
        ways.push(item as OverpassWay);
      }
    }
    return ways;
  }

  async adjacencyMatrix(nodes: any[]) {
    const arr = nodes;

    for (let i = 0; i < arr.length; i++) {
      if (i + 1 != arr.length) {
        const next = arr[i + 1];
        const issetConn = await this.adjacencyMatrixRepo.findOne({
          where: {
            nodeId: arr[i],
            toNodeId: next,
          },
        });

        if (!issetConn) {
          await this.adjacencyMatrixRepo.save({
            nodeId: arr[i],
            toNodeId: next,
          });
        }
      }
    }
  }

  async getPath() {
    const keys = await this.adjacencyMatrixRepo
      .createQueryBuilder('adjacency')
      .select('adjacency.nodeId')
      .distinct(true)
      .getMany();

    const toGraphOb = {};

    for (const item of keys) {
      console.log(item.nodeId);
      const paths = await this.adjacencyMatrixRepo.find({
        where: {
          nodeId: item.nodeId,
        },
      });

      console.log(paths)
    }
    // console.log(keys);
  }
  // async getDistances() {
  //   const dist = geolib.getPreciseDistance(
  //     {
  //       lat: 55.1687199,
  //       lon: 61.3523501,
  //     },
  //     { lat: 55.1685521, lon: 61.3512169 },
  //   );
  //   console.log(dist);
  //}
  // async getInfoWaysitems(
  //   items: OverpassNode[] | OverpassWay[],
  // ): Promise<WayDto[]> {}
}
