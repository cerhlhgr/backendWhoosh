import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { WaysEntity } from './ways.entity';

@Entity('ways-info')
export class WaysInfoEntity {
  @PrimaryColumn({
    type: 'bigint',
  })
  id: number;

  // @OneToOne(() => WaysEntity)
  // @JoinColumn()
  // way: WaysEntity;

  @Column({
    type: 'json',
    nullable: true,
  })
  payload: string;

  @Column({ nullable: true, type: 'int' })
  len: number;
}
