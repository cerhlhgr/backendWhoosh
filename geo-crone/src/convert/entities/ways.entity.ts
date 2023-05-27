import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { NodesEntity } from './nodes.entity';

@Entity('ways')
export class WaysEntity {
  @Column({
    type: 'bigint',
    primary: true,
  })
  wayId: number;

  // @ManyToOne(() => NodesEntity, (node) => node.way)
  // node: NodesEntity;

  @Column()
  nodeId: number;
}
