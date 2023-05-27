import { BasicWayDto } from './basic-way.dto';

export class NodeDto extends BasicWayDto {
  public coordinate: string;

  public payload?: string;
}
