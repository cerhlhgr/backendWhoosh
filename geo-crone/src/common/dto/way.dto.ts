import { BasicWayDto } from './basic-way.dto';

export class WayDto extends BasicWayDto {
  nodeId: number;
  wayId: number;
  payload?: string;
}
