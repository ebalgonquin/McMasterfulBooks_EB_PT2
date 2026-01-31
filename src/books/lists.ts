import Router from '@koa/router';
import assignment3 from '../../adapter/assignment-3';
import type { Book } from '../../adapter/assignment-3';

const listRouter = new Router();

listRouter.get('/books', async (ctx) => {
  const _filters = ctx.query.filters as Array<{ from?: string; to?: string }> | undefined;

  try {
    // No filters → return all books
    if (!_filters || !Array.isArray(_filters) || _filters.length === 0) {
      ctx.body = await assignment3.listBooks([]);
      return;
    }

    // Validate filters
    if (!_validateFilters(_filters)) {
      ctx.status = 400;
      ctx.body = {
        error:
          'Invalid filters. Each filter must have valid "from" and "to" numbers where from <= to.',
      };
      return;
    }

    // Convert strings → numbers
    const normalized = _filters.map(f => ({
      from: f.from !== undefined ? parseFloat(f.from) : undefined,
      to: f.to !== undefined ? parseFloat(f.to) : undefined
    }));

    // Apply filtering using the assignment-3 adapter
    const filteredBooks = await assignment3.listBooks(normalized);

    ctx.body = filteredBooks;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: `Failed to fetch books due to: ${error}` };
  }
});

// Validate filter structure
function _validateFilters(filters: unknown): boolean {
  if (!filters || !Array.isArray(filters)) {
    return false;
  }

  return filters.every((filter) => {
    const from = filter.from !== undefined ? parseFloat(filter.from) : undefined;
    const to = filter.to !== undefined ? parseFloat(filter.to) : undefined;

    if (from !== undefined && isNaN(from)) return false;
    if (to !== undefined && isNaN(to)) return false;
    if (from !== undefined && to !== undefined && from > to) return false;

    return true;
  });
}

export default listRouter;