import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import AxePuppeteer from '@axe-core/puppeteer';

import { UrlDocument } from 'src/mongoose/schemas/url.schema';
import { Report } from 'src/mongoose/schemas/report.schema';

@Injectable()
export class PuppeteerService {
  create_axe_report(urls: UrlDocument[], signal: AbortSignal) {
    return new Promise<Omit<Report, 'collection_id'>[]>(
      async (resolve, reject) => {
        signal.addEventListener(
          'abort',
          () => {
            reject('test');
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

            const { inapplicable, incomplete, passes, violations } =
              await new AxePuppeteer(page).analyze();

            reports.push({
              inapplicable,
              incomplete,
              passes,
              url_id,
              violations,
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
}
