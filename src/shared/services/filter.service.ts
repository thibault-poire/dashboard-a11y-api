import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  get_filters(queryparams) {
    if (!queryparams) {
      return null;
    }

    const { limit, populate, select, skip, sort } = queryparams;

    const populate_options = this.get_populate_options(populate);

    return {
      limit,
      populate: populate_options,
      projection: select?.join(' '),
      skip,
      sort: sort && {
        [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1,
      },
    };
  }

  private get_populate_options(populate) {
    if (!populate) {
      return null;
    }

    const [path] = Object.keys(populate);
    const { select, limit, skip, sort } = populate[path];

    return {
      path,
      select: select?.join(' '),
      options: {
        limit,
        skip,
        sort: sort && {
          [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1,
        },
      },
    };
  }
}
