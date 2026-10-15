export const adminPageSize = 50;

export type PageCursor = {
  at: string;
  id: string;
};

export type PageDirection = "after" | "before";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const timestampPattern = /^[0-9T:Z.+-]{20,40}$/;

export function isPageCursor(value: { at: string; id: string }): value is PageCursor {
  return timestampPattern.test(value.at) && Number.isFinite(Date.parse(value.at)) && uuidPattern.test(value.id);
}

export function encodePageCursor(cursor: PageCursor) {
  return Buffer.from(JSON.stringify({ at: cursor.at, id: cursor.id }), "utf8").toString("base64url");
}

export function decodePageCursor(token: string): PageCursor | null {
  if (token.length < 1 || token.length > 400) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(token, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const record = parsed as Record<string, unknown>;
  if (typeof record.at !== "string" || typeof record.id !== "string") return null;
  return isPageCursor({ at: record.at, id: record.id }) ? { at: record.at, id: record.id } : null;
}

/**
 * Rows are shown newest first. `after` keeps rows older than the cursor.
 * `before` keeps rows newer than the cursor. Equal timestamps use the id.
 */
type ListedTimestamp = "created_at" | "completed_at" | "updated_at";

export function keysetFilter(column: ListedTimestamp, direction: PageDirection, cursor: PageCursor) {
  const at = `"${cursor.at}"`;
  if (direction === "after") {
    return `and(${column}.eq.${at},id.lt.${cursor.id}),${column}.lt.${at}`;
  }
  return `and(${column}.eq.${at},id.gt.${cursor.id}),${column}.gt.${at}`;
}

export function keysetQuery(column: ListedTimestamp, direction: PageDirection | null, cursor: PageCursor | null) {
  return {
    ascending: direction === "before",
    filter: direction && cursor ? keysetFilter(column, direction, cursor) : null,
    limit: adminPageSize + 1,
  };
}

export function shapeListedPage<T>(data: readonly T[], direction: PageDirection | null, pageSize = adminPageSize) {
  const extra = data.length > pageSize;
  const page = data.slice(0, pageSize);
  if (direction === "before") {
    return { rows: [...page].reverse(), hasPrevious: extra, hasNext: true };
  }
  return { rows: [...page], hasPrevious: direction === "after", hasNext: extra };
}

export function appointmentListHref(
  queue: "pending" | "accepted",
  link: { direction: PageDirection; cursor: PageCursor } | null,
) {
  const params = new URLSearchParams();
  if (queue === "accepted") params.set("queue", "accepted");
  if (link && isPageCursor(link.cursor)) params.set(link.direction, encodePageCursor(link.cursor));
  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

export function historyListHref(link: { direction: PageDirection; cursor: PageCursor } | null) {
  if (!link || !isPageCursor(link.cursor)) return "/admin/history";
  const params = new URLSearchParams();
  params.set(link.direction, encodePageCursor(link.cursor));
  return `/admin/history?${params.toString()}`;
}

export function pipelineListHref(link: { direction: PageDirection; cursor: PageCursor } | null) {
  if (!link || !isPageCursor(link.cursor)) return "/admin/pipeline";
  const params = new URLSearchParams();
  params.set(link.direction, encodePageCursor(link.cursor));
  return `/admin/pipeline?${params.toString()}`;
}

export function isOlderThan(row: PageCursor, cursor: PageCursor) {
  const rowTime = Date.parse(row.at);
  const cursorTime = Date.parse(cursor.at);
  if (rowTime !== cursorTime) return rowTime < cursorTime;
  return row.id < cursor.id;
}

export function isNewerThan(row: PageCursor, cursor: PageCursor) {
  const rowTime = Date.parse(row.at);
  const cursorTime = Date.parse(cursor.at);
  if (rowTime !== cursorTime) return rowTime > cursorTime;
  return row.id > cursor.id;
}
