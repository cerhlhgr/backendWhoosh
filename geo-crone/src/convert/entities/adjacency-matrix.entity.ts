import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adjacency-matrix')
export class AdjacencyMatrixEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  nodeId: string;

  @Column({
    nullable: true,
  })
  toNodeId: string;
}
