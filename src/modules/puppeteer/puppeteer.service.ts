import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import AxePuppeteer from '@axe-core/puppeteer';

import { UrlDocument } from 'src/mongoose/schemas/url.schema';
import { Report } from 'src/mongoose/schemas/report.schema';
import { AxeResults } from 'axe-core';

@Injectable()
export class PuppeteerService {
  create_axe_reports(urls: UrlDocument[], signal: AbortSignal) {
    return new Promise<Omit<Report, 'collection_id'>[]>(
      async (resolve, reject) => {
        signal.addEventListener(
          'abort',
          () => {
            reject();
          },
          { once: true },
        );

        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          const reports = [];

          for (let index = 0; index < urls.length; index++) {
            const { _id: url_id, url } = urls[index];

            await page.goto(url);

            const report = await new AxePuppeteer(page).analyze();
            const formatted_report = this.format_report(report);

            reports.push({
              ...formatted_report,
              url_id,
            });
          }

          await browser.close();

          resolve(reports);
        } catch (error) {
          reject(error);
        }
      },
    );
  }

  format_report(report: AxeResults) {
    const { inapplicable, incomplete, passes, violations } = report;

    const formatted_report = [inapplicable, incomplete, passes, violations].map(
      (results) => {
        return results.map(({ id, description, nodes, tags, impact }) => {
          return impact
            ? { id, description, nodes, tags, impact }
            : { id, description, nodes, tags };
        });
      },
    );

    return {
      inapplicable: formatted_report[0],
      incomplete: formatted_report[1],
      passes: formatted_report[2],
      violations: formatted_report[3],
    };
  }
}
