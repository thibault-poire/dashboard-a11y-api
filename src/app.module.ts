import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { CollectionsModule } from './modules/collections/collections.module';
import { ReportsModule } from './modules/reports/reports.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),

    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@${process.env.DATABASE_URL}`,
    ),

    CollectionsModule,
    ReportsModule,

    RouterModule.register([
      { path: 'collections', module: CollectionsModule },
      { path: 'reports', module: ReportsModule },
    ]),
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
