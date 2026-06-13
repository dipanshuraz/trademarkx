import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type SortDirection = "asc" | "desc";

export type ColumnDef<T> = {
  id: string;
  header: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  searchValue?: (row: T) => string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type AdminDataGridProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  getRowKey: (row: T) => string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  toolbar?: ReactNode;
};

function compareValues(a: string | number, b: string | number, direction: SortDirection) {
  const result =
    typeof a === "number" && typeof b === "number"
      ? a - b
      : String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
  return direction === "asc" ? result : -result;
}

export function AdminDataGrid<T>({
  data,
  columns,
  getRowKey,
  searchPlaceholder = "Search...",
  emptyMessage = "No records found.",
  defaultPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  toolbar,
}: AdminDataGridProps<T>) {
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;

    return data.filter((row) =>
      columns.some((col) => {
        const value = col.searchValue?.(row) ?? "";
        return value.toLowerCase().includes(q);
      }),
    );
  }, [columns, data, query]);

  const sorted = useMemo(() => {
    if (!sortColumn) return filtered;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column?.sortable) return filtered;

    const getValue = column.sortValue ?? column.searchValue;
    if (!getValue) return filtered;

    return [...filtered].sort((a, b) => compareValues(getValue(a), getValue(b), sortDirection));
  }, [columns, filtered, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = sorted.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const pageEnd = Math.min(currentPage * pageSize, sorted.length);
  const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (columnId: string) => {
    setPage(1);
    if (sortColumn !== columnId) {
      setSortColumn(columnId);
      setSortDirection("asc");
      return;
    }
    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }
    setSortColumn(null);
    setSortDirection("asc");
  };

  const SortIcon = ({ columnId }: { columnId: string }) => {
    if (sortColumn !== columnId) return <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-gold" />
    ) : (
      <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-gold" />
    );
  };

  return (
    <Card className="border-gold-subtle">
      <CardHeader className="space-y-4 border-b border-gold-subtle pb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-9"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          {toolbar}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-section hover:bg-section">
                {columns.map((col) => (
                  <TableHead key={col.id} className={col.className}>
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.id)}
                        className="inline-flex items-center font-semibold text-navy transition-colors hover:text-gold"
                      >
                        {col.header}
                        <SortIcon columnId={col.id} />
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-28 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((row) => (
                  <TableRow key={getRowKey(row)} className="hover:bg-accent/40">
                    {columns.map((col) => (
                      <TableCell key={col.id} className={col.className}>
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t border-gold-subtle py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {sorted.length === 0
            ? "0 results"
            : `Showing ${pageStart}–${pageEnd} of ${sorted.length.toLocaleString("en-IN")} results`}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 w-[4.5rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <span className="min-w-[5rem] text-center text-sm text-muted-foreground">
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}