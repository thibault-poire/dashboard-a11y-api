export function create_populate_options(field: string, queryparams) {
  if (!queryparams || !field) {
    return null;
  }

  const { fields, limit, skip } = queryparams;
  const select = fields?.join(' ') ?? null;

  return {
    path: 'urls.reports',
    select,
    options: {
      limit,
      skip,
    },
  };
}
