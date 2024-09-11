import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import AxePuppeteer from '@axe-core/puppeteer';

import puppeteer from 'puppeteer';
import { AxeResults } from 'axe-core';
import { Model } from 'mongoose';

import { Report } from 'src/mongoose/schemas/report.schema';
import { Url, UrlDocument } from 'src/mongoose/schemas/url.schema';

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectModel(Report.name) private report_model: Model<Report>,
    @InjectModel(Url.name) private url_model: Model<Url>,
  ) {}

  create_axe_audit(urls: UrlDocument[]) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        for (let index = 0; index < urls.length; index++) {
          const { _id, url } = urls[index];

          await page.goto(url);

          const audit = await new AxePuppeteer(page).analyze();
          const formatted_audit = this.format_audit(audit);

          const report = await this.report_model.create(formatted_audit);

          await this.url_model.findByIdAndUpdate(_id, {
            $push: { reports: report._id },
          });
        }

        await browser.close();

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  format_audit(report: AxeResults) {
    const { inapplicable, incomplete, passes, violations } = report;

    const formatted_report = [];

    formatted_report.push(
      [inapplicable, incomplete].map((results) => {
        return results.map(({ id, description, tags }) => {
          return { id, description, tags };
        });
      }),
    );

    formatted_report.push(
      [passes, violations].map((results) => {
        return results.map(({ id, description, nodes, tags, impact }) => {
          return { id, description, nodes, tags, impact };
        });
      }),
    );

    return {
      inapplicable: formatted_report[0],
      incomplete: formatted_report[1],
      passes: formatted_report[2],
      violations: formatted_report[3],
    };
  }
}
