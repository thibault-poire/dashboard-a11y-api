import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { CollectionsModule } from './modules/collections/collections.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UrlsModule } from './modules/urls/urls.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AuditsModule } from './modules/audits/audits.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),

    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@${process.env.DATABASE_URL}`,
    ),

    AuditsModule,
    CollectionsModule,
    ReportsModule,
    UrlsModule,

    RouterModule.register([
      {
        path: '/api/',
        children: [
          {
            path: 'collections',
            module: CollectionsModule,
            children: [
              {
                path: '/:collection_id/urls',
                module: UrlsModule,
                children: [{ path: '/:url_id/reports', module: ReportsModule }],
              },
              {
                path: '/:collection_id/audits',
                module: AuditsModule,
              },
            ],
          },
        ],
      },
    ]),
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
