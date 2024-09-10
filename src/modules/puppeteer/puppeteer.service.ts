import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import AxePuppeteer from '@axe-core/puppeteer';

import { UrlDocument } from 'src/mongoose/schemas/url.schema';
import { Report } from 'src/mongoose/schemas/report.schema';
import { AxeResults } from 'axe-core';

@Injectable()
export class PuppeteerService {
  create_axe_audit(urls: UrlDocument[], signal: AbortSignal) {
    return new Promise<Report[]>(async (resolve, reject) => {
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

        const audit = [];

        for (let index = 0; index < urls.length; index++) {
          const { url } = urls[index];

          await page.goto(url);

          const report = await new AxePuppeteer(page).analyze();
          const formatted_report = this.format_report(report);

          audit.push(formatted_report);
        }

        await browser.close();

        resolve(audit);
      } catch (error) {
        reject(error);
      }
    });
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
