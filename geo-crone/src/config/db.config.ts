import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const DBConfigFactory = (
  configService: any,
): TypeOrmModuleOptions & PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  synchronize: configService.get('ENV') === 'DEV',
  autoLoadEntities: true,
});
// constructor(configService: ConfigService) {
//   this.type = 'postgres';
//   this.host = configService.get('POSTGRES_HOST');
//   this.port = configService.get('POSTGRES_PORT');
//   this.username = configService.get('POSTGRES_USER');
//   this.password = configService.get('POSTGRES_PASSWORD');
//   this.database = configService.get('POSTGRES_DB');
//   this.synchronize = configService.get<string>('ENV') === 'DEV';
//   this.entities = [NodesEntity, WaysEntity];
// }
