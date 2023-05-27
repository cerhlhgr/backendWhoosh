import { Injectable } from '@nestjs/common';
// import {Dijkstra} from './libs/dijkstra'
// import {OverpassService} from "./overpass/overpass.service";
@Injectable()
export class AppService {
  // constructor(private readonly overpassService: OverpassService) {
  // }
  getHello(): any {
    // this.overpassService.getNodesAndWay();
    // // const graph = new Dijkstra()
    // //
    // // graph.addVertex('1', {2: 2, 3:3})
    // // graph.addVertex('2', {})
    // // graph.addVertex('3', {2: 4})
    // // graph.addVertex('4', {1: 3, 5:0})
    // // graph.addVertex('5', {3: 3, 1:3})
    // //
    // // const res = graph.shortestPath('4','2')
    // return 'hello';
  }
}
