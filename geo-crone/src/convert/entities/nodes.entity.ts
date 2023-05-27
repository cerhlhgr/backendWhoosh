import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WaysEntity } from './ways.entity';

@Entity('nodes')
export class NodesEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'point',
  })
  coordinate: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  payload: string;

  // @OneToMany(() => WaysEntity, (way) => way.node)
  // way: WaysEntity[];
}
