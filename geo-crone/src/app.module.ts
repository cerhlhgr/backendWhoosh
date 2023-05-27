import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OverpassModule } from './overpass/overpass.module';
import { HttpModule } from './http/http.module';
import { ConvertModule } from './convert/convert.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/config-init';
import { DBConfigFactory } from './config/db.config';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', validate }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        DBConfigFactory(configService),
    }),
    OverpassModule,
    HttpModule,
    ConvertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
